const jwt = require("jsonwebtoken");
require("dotenv").config();

export const createTokens = (user) => {
	const accessToken = jwt.sign(
		{
			user_id: user._id,
			username: user.username,
			email: user.password,
		},
		process.env.JWT_SEC,
		{ expiresIn: "5s" }
	);

	const refreshToken = jwt.sign(
		{ username: user.username },
		process.env.REFRESH_SEC,
		{ expiresIn: "3d" }
	);
	return { accessToken, refreshToken };
};
