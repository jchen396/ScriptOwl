const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// uploading files
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("./s3");

import { createTokens } from "./auth";
import { connectDB } from "./config/db";
import { User } from "./models/User";

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

app.use(async (req, res, next) => {
	const accessToken = req.cookies["accessToken"];
	const refreshToken = req.cookies["refreshToken"];
	if (!refreshToken && !accessToken) {
		return next();
	}
	// check access token
	try {
		const data = jwt.verify(accessToken, process.env.JWT_SEC);
		req.user_id = data.user_id;
		return next();
	} catch (err) {}
	if (!refreshToken) {
		return next();
	}
	let data;
	// check refresh token
	try {
		data = jwt.verify(refreshToken, process.env.REFRESH_SEC);
	} catch (err) {}
	const user = await User.findOne({ id: data.user_id });
	// invalid token
	if (!user) {
		return next();
	}
	// create new tokens
	const tokens = createTokens(user);
	res.cookie("accessToken", tokens.accessToken, {
		httpOnly: true,
		sameSite: "None",
		secure: true,
		maxAge: 60 * 60 * 1000,
	});
	res.cookie("refreshToken", tokens.refreshToken, {
		httpOnly: true,
		sameSite: "None",
		secure: true,
		maxAge: 5 * 24 * 60 * 60 * 1000,
	});
	req.user_id = user.id;
	next();
});

// posting and fetching files to s3 via rest API
app.get("/images/:key", (req, res) => {
	console.log(req.params);
	const key = req.params.key;
	const readStream = getFileStream(key);

	readStream.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
	const file = req.file;
	console.log(file);

	// apply filter
	// resize

	const result = await uploadFile(file);
	await unlinkFile(file.path);
	console.log(result);
	const description = req.body.description;
	res.send({ imagePath: `/images/${result.Key}` });
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

app.listen(port, () => {
	console.log(`PORT ${port} is running.`);
});
