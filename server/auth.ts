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
		{ expiresIn: "1m" }
	);

	const refreshToken = jwt.sign(
		{ user_id: user.id },
		process.env.REFRESH_SEC,
		{ expiresIn: "5d" }
	);
	return { accessToken, refreshToken };
};
