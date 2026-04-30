import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTranscript } from "youtube-transcript";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { youtubeURL } = req.body;
    if (!youtubeURL) {
        return res.status(400).json({ error: "Missing youtubeURL" });
    }

    try {
        const transcript = await fetchTranscript(youtubeURL);
        const text = transcript.map((item) => item.text).join(" ");
        return res.status(200).json({ result: text });
    } catch (e: any) {
        console.error("Transcript fetch error:", e);
        return res.status(500).json({
            error: "Failed to fetch transcript",
            details: e?.message || String(e),
        });
    }
}
