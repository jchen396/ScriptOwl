const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const port = process.env.PORT || 5000;

import { connectDB } from "./config/db";

const loggingMiddleware = (req, res, next) => {
	console.log("middleware");
	next();
};
const app = express();
app.use(cors());

// connect to MongoDB database
connectDB();

app.use(loggingMiddleware);
// use GraphQL api
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === "development",
	})
);

app.listen(port, () => {
	console.log(`PORT ${port} is running.`);
});
