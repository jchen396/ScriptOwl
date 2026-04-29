import OpenAI from "openai";
import { config } from "dotenv";
config(); // load .env


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "missing",
  baseURL: "https://api.groq.com/openai/v1",
});


export const generateDefintion = async (word: string) => {
    try {
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
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
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: `Translate "${transcript}" to ${language}` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};

export const generateSummary = async (transcript: string) => {
    try {
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: `Give me a summary of "${transcript}" with all the key points. Format the summary in a structured note-taking format (e.g., using markdown, headings, and bullet points) to make it easy to study.` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};

export const generateAssessment = async (transcript: string) => {
    try {
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: `Create a high-quality, thought-provoking multiple choice quiz based on the following transcript. Format the output using markdown: use headings for each question, bullet points or numbered lists for the options, and provide a clear answer key at the bottom. Transcript: "${transcript}"` }],
        });
        return response.choices[0].message.content;
    } catch (e: any) {
        console.log(e);
        return "Error from AI: " + (e.message || JSON.stringify(e));
    }
};
