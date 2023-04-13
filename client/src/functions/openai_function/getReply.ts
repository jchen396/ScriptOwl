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
	option: string
) => {
	const reply = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}chatgpt/services`,
		{
			transcript,
			option,
		}
	);
	return reply.data;
};
