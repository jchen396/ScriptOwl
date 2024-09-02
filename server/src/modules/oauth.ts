const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
	const response = await fetch(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
	);

	const data = await response.json();
	return data;
}

/* GET home page. */
router.get("/", async function (req, res, next) {
	const code = req.query.code;
	let query;

	try {
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
		const r = await oAuth2Client.getToken(code);
		// Make sure to set the credentials on the OAuth2 client.
		await oAuth2Client.setCredentials(r.tokens);
		const user = oAuth2Client.credentials;
		const queryData = await getUserData(user.access_token);
		query = JSON.stringify(queryData);
	} catch (err) {
		console.log("Error logging in with OAuth2 user", err);
	}

	res.redirect(
		303,
		`${
			process.env.NODE_ENV === "development"
				? `http://localhost:3000/register?${query}`
				: `https://scriptowl.vercel.app/register?${query}`
		}`
	);
});

module.exports = router;
