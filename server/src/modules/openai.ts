import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
export const generateDefintion = async (word) => {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `What is "${word}"`,
				},
			],
		});
		return completion.choices[0].message.content;
	} catch (e) {
		console.log(e);
	}
};

export const generateTranslation = async (transcript, language) => {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Translate "${transcript}" to ${language}`,
				},
			],
		});
		return completion.choices[0].message.content;
	} catch (e) {
		console.log(e);
	}
};

export const generateSummary = async (transcript) => {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Give me a summary of "${transcript}" with all the key points.`,
				},
			],
		});
		return completion.choices[0].message.content;
	} catch (e) {
		console.log(e);
	}
};

export const generateAssessment = async (transcript) => {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Give me a short multiple choice quiz for "${transcript}"`,
				},
			],
		});
		return completion.choices[0].message.content;
	} catch (e) {
		console.log(e);
	}
};
