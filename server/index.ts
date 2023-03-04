const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
	console.log(
		`Timezones by location application is running on port ${port}.`
	);
});
