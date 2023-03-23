import axios from "axios";

export async function postImage({ image }: { image: File }) {
	const formData = new FormData();
	formData.append("image", image);
	const result = await axios
		.post("http://localhost:8080/images", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then((data) => data);
	return result.data;
}
