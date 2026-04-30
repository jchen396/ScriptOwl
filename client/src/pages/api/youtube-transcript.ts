import type { NextRequest } from "next/server";

export const config = {
    runtime: "edge",
};

// Invidious API instances — more reliable than Piped
// These are self-hosted YouTube frontends with their own proxy infrastructure
const INVIDIOUS_INSTANCES = [
    "https://inv.nadeko.net",
    "https://inv.odyssey346.dev",
    "https://inv.tux.pizza",
    "https://invidious.perennialte.ch",
];

// Piped instances as secondary fallback
const PIPED_INSTANCES = [
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.smnz.de",
];

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

function parseVtt(vtt: string): string[] {
    const lines: string[] = [];
    const seen = new Set<string>();
    const blocks = vtt.split("\n\n");

    for (const block of blocks) {
        const blockLines = block.trim().split("\n");
        const textLines = blockLines.filter(
            (line) =>
                !line.startsWith("WEBVTT") &&
                !line.startsWith("Kind:") &&
                !line.startsWith("Language:") &&
                !line.startsWith("NOTE") &&
                !line.match(/^\d{2}:\d{2}/) &&
                !line.match(/^\d+$/) &&
                line.trim().length > 0
        );
        for (const textLine of textLines) {
            const cleaned = textLine.replace(/<[^>]*>/g, "").trim();
            if (cleaned && !seen.has(cleaned)) {
                seen.add(cleaned);
                lines.push(cleaned);
            }
        }
    }
    return lines;
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
 * Try fetching transcript via an Invidious instance.
 * Invidious API: GET /api/v1/captions/{videoId} → list of captions
 *                GET /api/v1/captions/{videoId}?label=LABEL → VTT content
 */
async function tryInvidious(
    videoId: string,
    instance: string
): Promise<string | null> {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        // Step 1: Get list of available captions
        const listResponse = await fetch(
            `${instance}/api/v1/captions/${videoId}`,
            {
                signal: controller.signal,
                headers: { Accept: "application/json" },
            }
        );

        clearTimeout(timeout);

        if (!listResponse.ok) {
            console.log(`[Invidious ${instance}] List HTTP ${listResponse.status}`);
            return null;
        }

        const data = await listResponse.json();
        const captions = data?.captions;

        if (!captions || captions.length === 0) {
            console.log(`[Invidious ${instance}] No captions found`);
            return null;
        }

        // Find English captions (prefer non-auto)
        const enCaption =
            captions.find(
                (c: any) =>
                    c.language_code === "en" && c.label && !c.label.includes("auto")
            ) ||
            captions.find((c: any) => c.language_code === "en") ||
            captions.find((c: any) =>
                c.label?.toLowerCase().includes("english")
            ) ||
            captions[0];

        if (!enCaption?.label) {
            console.log(`[Invidious ${instance}] No English caption`);
            return null;
        }

        console.log(
            `[Invidious ${instance}] Found caption: "${enCaption.label}"`
        );

        // Step 2: Fetch the caption content
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 10000);

        const captionResponse = await fetch(
            `${instance}/api/v1/captions/${videoId}?label=${encodeURIComponent(enCaption.label)}`,
            {
                signal: controller2.signal,
            }
        );

        clearTimeout(timeout2);

        if (!captionResponse.ok) {
            console.log(
                `[Invidious ${instance}] Caption HTTP ${captionResponse.status}`
            );
            return null;
        }

        const content = await captionResponse.text();

        if (!content || content.length < 10) {
            console.log(`[Invidious ${instance}] Empty caption content`);
            return null;
        }

        // Parse the content
        let lines: string[];
        if (content.includes("WEBVTT")) {
            lines = parseVtt(content);
        } else if (content.includes("<text")) {
            lines = parseXml(content);
        } else {
            lines = content
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);
        }

        if (lines.length === 0) {
            console.log(`[Invidious ${instance}] No text extracted`);
            return null;
        }

        console.log(
            `[Invidious ${instance}] SUCCESS — ${lines.length} lines`
        );
        return lines.join("\n");
    } catch (err: any) {
        console.log(`[Invidious ${instance}] Error: ${err.message}`);
        return null;
    }
}

/**
 * Try fetching transcript via a Piped instance
 */
async function tryPiped(
    videoId: string,
    instance: string
): Promise<string | null> {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${instance}/streams/${videoId}`, {
            signal: controller.signal,
            headers: { Accept: "application/json" },
        });

        clearTimeout(timeout);

        if (!response.ok) {
            console.log(`[Piped ${instance}] HTTP ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (!data.subtitles || data.subtitles.length === 0) {
            console.log(`[Piped ${instance}] No subtitles`);
            return null;
        }

        const enSub =
            data.subtitles.find(
                (s: any) => s.code === "en" && !s.autoGenerated
            ) ||
            data.subtitles.find((s: any) => s.code === "en") ||
            data.subtitles[0];

        if (!enSub?.url) return null;

        const subResponse = await fetch(enSub.url);
        if (!subResponse.ok) return null;

        const subContent = await subResponse.text();
        if (!subContent) return null;

        let lines: string[];
        if (subContent.includes("WEBVTT")) {
            lines = parseVtt(subContent);
        } else if (subContent.includes("<text")) {
            lines = parseXml(subContent);
        } else {
            lines = subContent
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);
        }

        if (lines.length === 0) return null;

        console.log(`[Piped ${instance}] SUCCESS — ${lines.length} lines`);
        return lines.join("\n");
    } catch (err: any) {
        console.log(`[Piped ${instance}] Error: ${err.message}`);
        return null;
    }
}

/**
 * Fallback: Direct innertube (works from residential IPs / local dev)
 */
async function tryInnertube(videoId: string): Promise<string | null> {
    try {
        const response = await fetch(
            `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_API_KEY}&prettyPrint=false`,
            {
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

        const captionRes = await fetch(
            track.baseUrl.replace("&fmt=srv3", ""),
            { headers: { Cookie: CONSENT_COOKIE } }
        );
        if (!captionRes.ok) return null;

        const xml = await captionRes.text();
        const lines = parseXml(xml);
        if (!lines.length) return null;

        console.log(`[Innertube] SUCCESS — ${lines.length} lines`);
        return lines.join("\n");
    } catch (err: any) {
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

    let transcript: string | null = null;

    // 1. Try Invidious instances (most reliable free option)
    for (const instance of INVIDIOUS_INSTANCES) {
        transcript = await tryInvidious(videoId, instance);
        if (transcript) break;
    }

    // 2. Try Piped instances
    if (!transcript) {
        for (const instance of PIPED_INSTANCES) {
            transcript = await tryPiped(videoId, instance);
            if (transcript) break;
        }
    }

    // 3. Direct innertube fallback (local dev / non-blocked IPs)
    if (!transcript) {
        transcript = await tryInnertube(videoId);
    }

    if (!transcript) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch transcript",
                details:
                    "Could not retrieve transcript. The video may not have captions, or all transcript services are currently unavailable.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify({ result: transcript }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
