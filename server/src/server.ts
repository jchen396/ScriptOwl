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
const bodyParser = require("body-parser");

// MongoDB configurations
import { Post } from "../models/Post";

// setting up multer environments
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, "src/uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname +
				"-" +
				uniqueSuffix +
				path.extname(file.originalname)
		);
	},
});
const upload = multer({ storage: storage });

import { authenticateTokens } from "./modules/auth";
import { connectDB } from "../config/db";
const { spawn } = require("child_process");
import {
	generateAssessment,
	generateDefintion,
	generateTranslation,
	generateSummary,
} from "./modules/openai";
const {
	uploadImage,
	getImageFileStream,
	uploadVideo,
	uploadThumbnail,
	getThumbnailFileStream,
} = require("./modules/s3");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	cors({
		credentials: true,
		origin: [
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: "https://scriptowl.vercel.app",
		],
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
	} catch (e) {
		res.json(e).status(400);
	}
});

// Post image to AWS S3 Bucket
app.post("/images", upload.single("image"), async (req, res) => {
	try {
		const key = await uploadImage(req.file);
		await unlinkFile(req.file.path);
		res.send({ key }).status(200);
	} catch (e) {
		res.json(e).status(400);
	}
});

// Post video to AWS S3 Bucket
app.post("/videos", upload.single("video"), async (req, res) => {
	try {
		const filename = req.file.filename.split(".")[0];
		// Get video data from python script
		let result;
		const scriptPath = `${__dirname}/uploads/extract_video_data.py`;
		console.log(scriptPath);
		const pythonScript = spawn("python", [scriptPath, filename]);
		pythonScript.stdout.on("data", (data) => {
			result = data.toString();
		});
		pythonScript.on("close", async () => {
			// upload the rest of the content to s3
			console.log(result);
			const key = await uploadVideo(req.file);
			const thumbnailKey = await uploadThumbnail(`${filename}.jpg`);
			await unlinkFile(req.file.path);
			await unlinkFile(`src\\uploads\\${filename}.jpg`);
			res.send({ key, result, thumbnailKey }).status(200);
		});
		pythonScript.on("error", (err) => {
			console.log("Error: ", err);
		});
	} catch (e) {
		res.json(e).status(400);
	}
});

app.get("/thumbnails/:key", async (req, res) => {
	try {
		const key = req.params.key;
		const { Body } = await getThumbnailFileStream(key);
		Body.pipe(res);
	} catch (e) {
		res.json(e).status(400);
	}
});

// Ask ChatGPT to define a word from transcript
app.post("/chatgpt/define", async (req, res) => {
	try {
		const reply = await generateDefintion(req.body.word);
		return res.json(reply).status(200);
	} catch (e) {
		res.json(e).status(400);
	}
});

app.post("/chatgpt/services", async (req, res) => {
	try {
		let reply;
		if (req.body.option === "translate") {
			reply = await generateTranslation(
				req.body.transcript,
				req.body.language
			);
		} else if (req.body.option === "summarize") {
			reply = await generateSummary(req.body.transcript);
		} else if (req.body.option === "assess") {
			reply = await generateAssessment(req.body.transcript);
		}
		return res.json(reply).status(200);
	} catch (e) {
		res.json(e).status(400);
	}
});

app.get("/postCount", async (req, res) => {
	try {
		const count = await Post.find().countDocuments();
		res.json(count).status(200);
	} catch (e) {
		res.json(e).status(400);
	}
});

const { sendEmail } = require("./modules/sendgrid");

app.post("/sendgrid", async (req, res) => {
	try {
		const response = await sendEmail(req, res);
	} catch (e) {
		console.log(e);
		res.json(e).status(400);
	}
});

app.post("/youtube", async (req, res) => {
	try {
		console.log(req.params);
	} catch (e) {}
});

const authRouter = require("./modules/oauth");
const requestRouter = require("./modules/request");

// OAuth
app.use("/oauth", authRouter);
app.use("/request", requestRouter);

app.listen(port, () => {
	console.log(`PORT ${port} is running.`);
});
