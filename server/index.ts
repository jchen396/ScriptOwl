const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

import { connectDB } from "./config/db";

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

app.use((req, _, next) => {
	const accessToken = req.cookies["accessToken"];
	try {
		const data = jwt.verify(accessToken, process.env.JWT_SEC);
		req.user_id = data.user_id;
	} catch (err) {}
	next();
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
