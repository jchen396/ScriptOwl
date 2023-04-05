import axios from "axios";

export const getPageCount = async () => {
	const limit = 20;
	const count = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}postCount`
	);

	return count.data / limit;
};
