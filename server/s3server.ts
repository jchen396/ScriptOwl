const { uploadFile, getFileStream } = require("./s3");
const express = require("express");
require("dotenv").config();
const port = process.env.S3_PORT || 8080;
const fs = require("fs");
const cors = require("cors");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const app = express();
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {} = require("./s3");

// posting and fetching files to s3 via rest API
app.get("/images/:key", async (req, res) => {
	const key = req.params.key;
	const { Body } = await getFileStream(key);
	Body.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
	const result = await uploadFile(req.file);
	await unlinkFile(req.file.path);
	res.send({ imagePath: `/images/${result}` });
});

app.listen(port, () => {
	console.log(`PORT ${port} is running.`);
});
