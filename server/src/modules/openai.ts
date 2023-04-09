import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export const generateDefintion = async (word) => {
	try {
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `What is "${word}"`,
				},
			],
		});
		return completion.data.choices[0].message.content;
	} catch (e) {
		console.log(e);
	}
};
