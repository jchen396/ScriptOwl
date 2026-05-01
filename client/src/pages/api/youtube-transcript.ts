import type { NextRequest } from "next/server";

export const config = {
    runtime: "edge", 
};

const INNERTUBE_API_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
const CONSENT_COOKIE = "SOCS=CAESEwgDEgk2ODE5MTAyNjUaAmVuIAEaBgiA_LyaBg";

function extractVideoId(url: string): string | null {
    const regex =
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+[\?\&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function decodeEntities(text: string): string {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/<[^>]*>/g, "")
        .trim();
}

function parseXml(xml: string): string[] {
    const lines: string[] = [];
    const regex = /<text[^>]*>([\s\S]*?)<\/text>/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
        const text = decodeEntities(match[1]);
        if (text) lines.push(text);
    }
    return lines;
}

/**
 * Fetch transcript via direct innertube API
 * On Vercel, this WILL be blocked by YouTube unless proxied.
 */
async function tryInnertube(videoId: string): Promise<string | null> {
    try {
        // If you sign up for a free scraping API (like ScraperAPI, ZenRows, etc.),
        // you can route the request through their proxy network here to bypass the block.
        const USE_PROXY = process.env.SCRAPER_API_KEY ? true : false;
        
        console.log(`[Innertube] Proxy enabled: ${USE_PROXY}`);
        if (!USE_PROXY) {
            throw new Error("MISSING_API_KEY");
        }
        
        let targetUrl = `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_API_KEY}&prettyPrint=false`;
        
        if (USE_PROXY) {
            targetUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=${encodeURIComponent(targetUrl)}`;
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 25000);

        const response = await fetch(
            targetUrl,
            {
                signal: controller.signal,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent":
                        "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip",
                    Cookie: CONSENT_COOKIE,
                },
                body: JSON.stringify({
                    context: {
                        client: {
                            clientName: "ANDROID",
                            clientVersion: "20.10.38",
                            androidSdkVersion: 30,
                        },
                    },
                    videoId,
                }),
            }
        );
        
        clearTimeout(timeout);

        if (!response.ok) return null;
        const data = await response.json();
        
        if (data?.playabilityStatus?.status !== "OK") {
            console.log(
                `[Innertube] ${data?.playabilityStatus?.status}: ${data?.playabilityStatus?.reason}`
            );
            return null;
        }

        const tracks =
            data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (!tracks?.length) return null;

        const track =
            tracks.find(
                (t: any) => t.languageCode === "en" && t.kind !== "asr"
            ) ||
            tracks.find((t: any) => t.languageCode === "en") ||
            tracks[0];
            
        if (!track?.baseUrl) return null;

        let captionUrl = track.baseUrl.replace("&fmt=srv3", "");
        if (USE_PROXY) {
            captionUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=${encodeURIComponent(captionUrl)}`;
        }

        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 25000);

        const captionRes = await fetch(captionUrl, { 
            headers: { Cookie: CONSENT_COOKIE },
            signal: controller2.signal 
        });
        
        clearTimeout(timeout2);
        
        if (!captionRes.ok) return null;

        const xml = await captionRes.text();
        const lines = parseXml(xml);
        if (!lines.length) return null;

        console.log(`[Innertube] SUCCESS — ${lines.length} lines`);
        return lines.join("\n");
    } catch (err: any) {
        if (err.message === "MISSING_API_KEY") {
            throw err;
        }
        console.log(`[Innertube] Error: ${err.message}`);
        return null;
    }
}

export default async function handler(req: NextRequest) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            { status: 405, headers: { "Content-Type": "application/json" } }
        );
    }

    let body: any;
    try {
        body = await req.json();
    } catch {
        return new Response(
            JSON.stringify({ error: "Invalid request body" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const { youtubeURL } = body;
    if (!youtubeURL) {
        return new Response(
            JSON.stringify({ error: "youtubeURL is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const videoId = extractVideoId(youtubeURL);
    if (!videoId) {
        return new Response(
            JSON.stringify({ error: "Invalid YouTube URL" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    // Since public proxies are heavily rate-limited and Vercel IPs are blocked,
    // we fetch directly from Innertube. In production, you must use a proxy service 
    // to mask Vercel's datacenter IP.
    let transcript: string | null = null;
    
    try {
        transcript = await tryInnertube(videoId);
    } catch (err: any) {
        if (err.message === "MISSING_API_KEY") {
            return new Response(
                JSON.stringify({
                    error: "Scraper API Key Missing",
                    details:
                        "The SCRAPER_API_KEY environment variable is not loaded. If you added it in Vercel, you MUST trigger a new deployment for it to take effect. If you don't use a proxy, YouTube will block Vercel IPs.",
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    if (!transcript) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch transcript",
                details:
                    "YouTube blocked the request because it originated from a Vercel data center. To fix this, configure a residential proxy or scraping API in your Vercel environment variables.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify({ result: transcript }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

