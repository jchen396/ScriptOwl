import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateDefintion = async (word: string) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(`What is "${word}"`);
        return result.response.text();
    } catch (e: any) {
        console.log(e);
        return "Error from Gemini: " + (e.message || JSON.stringify(e));
    }
};

export const generateTranslation = async (
    transcript: string,
    language: string,
) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(`Translate "${transcript}" to ${language}`);
        return result.response.text();
    } catch (e: any) {
        console.log(e);
        return "Error from Gemini: " + (e.message || JSON.stringify(e));
    }
};

export const generateSummary = async (transcript: string) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(`Give me a summary of "${transcript}" with all the key points.`);
        return result.response.text();
    } catch (e: any) {
        console.log(e);
        return "Error from Gemini: " + (e.message || JSON.stringify(e));
    }
};

export const generateAssessment = async (transcript: string) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(`Give me a short multiple choice quiz for "${transcript}"`);
        return result.response.text();
    } catch (e: any) {
        console.log(e);
        return "Error from Gemini: " + (e.message || JSON.stringify(e));
    }
};
