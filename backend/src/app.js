const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.json({ message: "Hello!" });
});

app.listen(80, () => {
	console.log("Listening on port 80");
});
