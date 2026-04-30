import * as https from "https";
import * as http from "http";

const USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";

const CONSENT_COOKIE = "SOCS=CAESEwgDEgk2ODE5MTAyNjUaAmVuIAEaBgiA_LyaBg";

// Public InnerTube API key — this is a well-known constant, no need to scrape it
const INNERTUBE_API_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";

// Use ANDROID client like youtube-transcript-api does — less restricted than WEB
const INNERTUBE_CONTEXT = {
    client: {
        clientName: "ANDROID",
        clientVersion: "20.10.38",
    },
};

function extractVideoId(url: string): string | null {
    const regex =
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+[\?\&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function fetchUrl(
    url: string,
    options: {
        headers?: Record<string, string>;
        method?: string;
        body?: string;
    } = {}
): Promise<string> {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const transport = parsedUrl.protocol === "https:" ? https : http;

        const reqOptions = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            method: options.method || "GET",
            headers: {
                "User-Agent": USER_AGENT,
                "Accept-Language": "en-US,en;q=0.9",
                Cookie: CONSENT_COOKIE,
                ...(options.headers || {}),
            },
        };

        const req = transport.request(reqOptions, (res) => {
            // Treat redirects as errors — YouTube redirects blocked IPs
            // to google.com/sorry which we should not follow
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
                const location = res.headers.location || "";
                reject(new Error(
                    `YouTube redirected request (likely IP blocked). Location: ${location.substring(0, 100)}`
                ));
                res.resume();
                return;
            }

            if (res.statusCode && res.statusCode >= 400) {
                reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
                res.resume();
                return;
            }

            const chunks: Buffer[] = [];
            res.on("data", (chunk: Buffer) => chunks.push(chunk));
            res.on("end", () =>
                resolve(Buffer.concat(chunks).toString("utf-8"))
            );
            res.on("error", reject);
        });

        req.on("error", reject);
        req.setTimeout(15000, () => {
            req.destroy(new Error("Request timed out"));
        });

        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

/**
 * Decode HTML entities in caption text
 */
function decodeEntities(text: string): string {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/<[^>]*>/g, "") // strip any HTML tags
        .trim();
}

/**
 * Fetch caption tracks via InnerTube player API using ANDROID client.
 * This goes directly to the API — no page scraping needed.
 */
async function fetchCaptionTracks(videoId: string): Promise<any[]> {
    const payload = JSON.stringify({
        context: INNERTUBE_CONTEXT,
        videoId: videoId,
    });

    const response = await fetchUrl(
        `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_API_KEY}&prettyPrint=false`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-YouTube-Client-Name": "3",
                "X-YouTube-Client-Version": "20.10.38",
            },
            body: payload,
        }
    );

    const data = JSON.parse(response);

    // Check playability
    const status = data?.playabilityStatus?.status;
    if (status !== "OK") {
        const reason =
            data?.playabilityStatus?.reason || "Unknown playability error";

        if (reason.includes("Sign in to confirm")) {
            throw new Error(
                "YouTube is temporarily blocking requests. Please try again later."
            );
        }
        throw new Error(`Video unavailable: ${reason}`);
    }

    const captionTracks =
        data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!captionTracks || captionTracks.length === 0) {
        throw new Error("No captions available for this video");
    }

    return captionTracks;
}

/**
 * Parse XML caption data into transcript lines
 */
function parseTranscriptXml(xml: string): string[] {
    const lines: string[] = [];
    const regex = /<text[^>]*>([\s\S]*?)<\/text>/g;
    let match;

    while ((match = regex.exec(xml)) !== null) {
        const text = decodeEntities(match[1]);
        if (text) {
            lines.push(text);
        }
    }

    return lines;
}

/**
 * Fetch a YouTube video's transcript.
 *
 * Goes directly to the InnerTube player API with ANDROID client context,
 * bypassing the video page entirely to avoid IP-based blocking on cloud servers.
 */
export async function getYoutubeTranscript(url: string): Promise<string> {
    const videoId = extractVideoId(url);
    if (!videoId) {
        throw new Error("Invalid YouTube URL");
    }

    // Step 1: Get caption tracks directly via ANDROID innertube client
    // (no page fetch needed — API key is a well-known constant)
    const captionTracks = await fetchCaptionTracks(videoId);

    // Step 2: Find English captions (prefer manual over auto-generated)
    const manualEn = captionTracks.find(
        (t: any) => t.languageCode === "en" && t.kind !== "asr"
    );
    const autoEn = captionTracks.find(
        (t: any) => t.languageCode === "en" && t.kind === "asr"
    );
    const selectedTrack = manualEn || autoEn || captionTracks[0];

    if (!selectedTrack?.baseUrl) {
        throw new Error("No usable caption track found");
    }

    // Remove any fmt=srv3 param (we want default XML format)
    const captionUrl = selectedTrack.baseUrl.replace("&fmt=srv3", "");

    // Step 3: Fetch the caption XML
    const captionXml = await fetchUrl(captionUrl);

    if (!captionXml || captionXml.length === 0) {
        throw new Error("Caption data was empty — YouTube may be blocking this request");
    }

    // Step 4: Parse XML into text lines
    const lines = parseTranscriptXml(captionXml);

    if (lines.length === 0) {
        throw new Error("No transcript text found in caption data");
    }

    return lines.join("\n");
}

