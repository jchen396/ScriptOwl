import axios from "axios";

export async function postImage({ image }: { image: File }) {
	const formData = new FormData();
	formData.append("image", image);
	const result = await axios
		.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then((data) => data);
	return result.data;
}
