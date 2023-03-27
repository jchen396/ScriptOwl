const express = require("express");
require("dotenv").config({ path: "../.env" });
const { graphqlHTTP } = require("express-graphql");
const schema = require("./../schema/schema");
const cors = require("cors");
const port = process.env.PORT || 8080;
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
import { authenticateTokens } from "./modules/auth";
import { connectDB } from "../config/db";
const {
	uploadImage,
	getImageFileStream,
	uploadVideo,
} = require("./modules/s3");

const app = express();
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);

// connect to MongoDB database
connectDB();

app.use(cookieParser());
// authenticate tokens
app.use(async (req, res, next) => {
	authenticateTokens(req, res, next);
});
// use GraphQL api
app.use(
	"/graphql",
	graphqlHTTP((_, res) => {
		return {
			schema,
			context: { res },
			graphiql: process.env.NODE_ENV === "development",
		};
	})
);

// posting and fetching files to s3 via rest API
app.get("/images/:key", async (req, res) => {
	try {
		const key = req.params.key;
		const { Body } = await getImageFileStream(key);
		Body.pipe(res);
	} catch (e) {}
});

app.post("/images", upload.single("image"), async (req, res) => {
	try {
		const result = await uploadImage(req.file);
		await unlinkFile(req.file.path);
		res.send({ key: `${result}` });
	} catch (e) {}
});

app.post("/videos", upload.single("video"), async (req, res) => {
	try {
		const result = await uploadVideo(req.file);
		await unlinkFile(req.file.path);
		res.send({ key: `${result}` });
	} catch (e) {}
});

app.listen(port, () => {
	console.log(`PORT ${port} is running.`);
});
