// package for setting up python script calls
const { spawn } = require("child_process");

export const getVideoData = (filename: string) => {
	return new Promise<string>((resolve, reject) => {
		try {
			let result;
			const pythonScript = spawn("python", [
				`${__dirname}/../uploads/extract_video_data.py`,
				filename,
			]);
			pythonScript.stdout.on("data", (data) => {
				result = data.toString();
			});
			pythonScript.on("close", () => {
				resolve(result);
			});
			pythonScript.on("error", (err) => {
				throw new Error(err.message);
			});
		} catch (e) {
			reject(e);
		}
	});
};
