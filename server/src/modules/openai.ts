import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	organization: process.env.OPENAI_ORG_ID,
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export const generateDefintion = async (word) => {
	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `What is "${word}"`,
			},
		],
	});
	return await completion.data.choices[0].message.content;
};
