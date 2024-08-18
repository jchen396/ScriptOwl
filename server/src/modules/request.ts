const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

import { OAuth2Client } from "google-auth-library";

router.post("/", async function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Referrer-Policy", "no-referrer-when-downgrade");
	const redirectURL = "http://localhost:5000/oauth";

	const oAuth2Client = new OAuth2Client(
		process.env.GCP_OAUTH_CLIENT_ID,
		process.env.GCP_OAUTH_CLIENT_SECRET,
		redirectURL
	);

	// Generate the url that will be used for the consent dialog.
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
		prompt: "consent",
	});

	res.json({ url: authorizeUrl });
});

/* GET users listing. */

module.exports = router;
