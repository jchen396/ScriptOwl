import axios from "axios";

export async function postVideo({ videoFile }: { videoFile: File }) {
	const formData = new FormData();
	formData.append("video", videoFile);
	const result = await axios
		.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}videos`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then((data) => data);

	return result.data;
}
