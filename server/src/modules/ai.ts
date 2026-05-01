import OpenAI from "openai";
import { config } from "dotenv";
config(); // load .env

// Support multiple comma-separated Groq API keys for round-robin rotation
const GROQ_API_KEYS = (process.env.GROQ_API_KEY || "missing")
    .split(",")
    .map(k => k.trim())
    .filter(Boolean);
let groqKeyIndex = 0;

function getGroqClient(): OpenAI {
    const key = GROQ_API_KEYS[groqKeyIndex % GROQ_API_KEYS.length];
    groqKeyIndex++;
    return new OpenAI({
        apiKey: key,
        baseURL: "https://api.groq.com/openai/v1",
    });
}

// ── Token limit management ──────────────────────────────────────────────
// The Groq free tier enforces 6,000 tokens per request (input + output).
// We reserve tokens for the prompt template and the AI response, then cap
// the transcript text to whatever remains.
const MAX_REQUEST_TOKENS = 6000;
const RESPONSE_TOKEN_RESERVE = 1024; // tokens reserved for AI output
const PROMPT_OVERHEAD_TOKENS = 150;  // tokens used by the prompt template itself

// Max tokens the transcript text can occupy
const MAX_TRANSCRIPT_TOKENS =
    MAX_REQUEST_TOKENS - RESPONSE_TOKEN_RESERVE - PROMPT_OVERHEAD_TOKENS;

/**
 * Rough token estimate: ~1 token per 4 characters (GPT/Llama-family heuristic).
 */
function estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
}

/**
 * Truncate text so it fits within the allowed token budget.
 * Tries to break at a sentence boundary when possible.
 */
export function truncateToTokenLimit(
    text: string,
    maxTokens: number = MAX_TRANSCRIPT_TOKENS,
): string {
    const currentTokens = estimateTokens(text);
    if (currentTokens <= maxTokens) return text;

    // Approximate char limit from token budget
    const charLimit = maxTokens * 4;
    let truncated = text.slice(0, charLimit);

    // Try to end at the last sentence boundary
    const lastSentenceEnd = Math.max(
        truncated.lastIndexOf(". "),
        truncated.lastIndexOf("! "),
        truncated.lastIndexOf("? "),
    );
    if (lastSentenceEnd > charLimit * 0.5) {
        truncated = truncated.slice(0, lastSentenceEnd + 1);
    }

    return truncated;
}

/**
 * Maximum character length for a transcript to stay within the AI token limit.
 * Exported so other modules can enforce this at fetch time.
 */
export const MAX_TRANSCRIPT_CHARS = MAX_TRANSCRIPT_TOKENS * 4; // ~19,304 chars


export const generateDefintion = async (word: string) => {
    try {
        const response = await getGroqClient().chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: RESPONSE_TOKEN_RESERVE,
            messages: [{ role: "user", content: `What is "${word}"` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};

export const generateTranslation = async (
    transcript: string,
    language: string,
) => {
    try {
        const safeTranscript = truncateToTokenLimit(transcript);
        const response = await getGroqClient().chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: RESPONSE_TOKEN_RESERVE,
            messages: [{ role: "user", content: `Translate "${safeTranscript}" to ${language}` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};

export const generateSummary = async (transcript: string) => {
    try {
        const safeTranscript = truncateToTokenLimit(transcript);
        const response = await getGroqClient().chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: RESPONSE_TOKEN_RESERVE,
            messages: [{ role: "user", content: `Give me a summary of "${safeTranscript}" with all the key points. Format the summary in a structured note-taking format (e.g., using markdown, headings, and bullet points) to make it easy to study.` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};

export const generateAssessment = async (transcript: string) => {
    try {
        const safeTranscript = truncateToTokenLimit(transcript);
        const response = await getGroqClient().chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: RESPONSE_TOKEN_RESERVE,
            messages: [{ role: "user", content: `Create a high-quality, thought-provoking multiple choice quiz based on the following transcript. Format the output using markdown: use headings for each question, bullet points or numbered lists for the options, and provide a clear answer key at the bottom. Transcript: "${safeTranscript}"` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};
