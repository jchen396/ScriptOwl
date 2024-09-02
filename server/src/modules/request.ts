const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

import { OAuth2Client } from "google-auth-library";

router.post("/", async function (req, res, next) {
	res.header(
		"Access-Control-Allow-Origin",
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://scriptowl.vercel.app"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Referrer-Policy", "no-referrer-when-downgrade");
	const redirectURL = `${
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/oauth"
			: "https://script-owl-server.onrender.com/oauth"
	}`;

	const oAuth2Client = new OAuth2Client(
		process.env.GCP_OAUTH_CLIENT_ID,
		process.env.GCP_OAUTH_CLIENT_SECRET,
		redirectURL
	);

	// Generate the url that will be used for the consent dialog.
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: "https://www.googleapis.com/auth/userinfo.profile  openid profile email",
		prompt: "consent",
	});
	res.json({ url: authorizeUrl });
});

/* GET users listing. */

module.exports = router;
