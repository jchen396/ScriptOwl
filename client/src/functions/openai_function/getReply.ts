import axios from "axios";
export const getReply = async (word: string | null) => {
	const reply = await axios.post(
		`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}chatgpt`,
		{
			word,
		}
	);
	return reply.data;
};
