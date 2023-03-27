import { User } from "../../models/User";

const jwt = require("jsonwebtoken");
require("dotenv").config();

export const createTokens = (user) => {
	const accessToken = jwt.sign(
		{
			user_id: user._id,
			username: user.username,
			email: user.password,
			avatarKey: user.avatarKey,
		},
		process.env.JWT_SEC,
		{ expiresIn: "15m" }
	);

	const refreshToken = jwt.sign(
		{ user_id: user.id },
		process.env.REFRESH_SEC,
		{ expiresIn: "5d" }
	);
	return { accessToken, refreshToken };
};

export const authenticateTokens = async (req, res, next) => {
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
	const user = await User.findById(data.user_id);
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
		maxAge: 15 * 60 * 1000,
	});
	res.cookie("refreshToken", tokens.refreshToken, {
		httpOnly: true,
		sameSite: "None",
		secure: true,
		maxAge: 5 * 24 * 60 * 60 * 1000,
	});
	req.user_id = user.id;
	next();
};
