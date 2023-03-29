import fs from "fs";

export const downloadVideo = (req, res) => {
	const path = req.file.path;
	const file = fs.createReadStream(path);
	console.log(file);
	const filename = new Date().toISOString;
	res.setHeader(
		"Content-Disposition",
		'attachment: filename="' + filename + '"'
	);
	file.pipe(res);
};
