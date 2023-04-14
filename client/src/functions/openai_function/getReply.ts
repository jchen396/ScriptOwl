import axios from "axios";
export const getDefinition = async (word: string | null) => {
	const reply = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}chatgpt/define`,
		{
			word,
		}
	);
	return reply.data;
};

export const getTranscriptServices = async (
	transcript: string,
	option: string,
	language?: string
) => {
	const reply = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}chatgpt/services`,
		{
			transcript,
			option,
			language,
		}
	);
	return reply.data;
};
