const express = require("express");
const expressIp = require("express-ip");
const db = require("./db");
const { analyticsRouter, paymentRouter } = require("./routers");
const { v4 } = require("uuid");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(expressIp().getIpInfoMiddleware);

app.get("/", (req, res) => { res.sendStatus(200); });
app.use("/a", analyticsRouter);
app.use("/p", paymentRouter);
app.use("/s", cookieParser(), (req, res) => {
	console.log(req.cookies);
	res.sendStatus(200);
});

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	console.log(err);
	const { status = 500, message, jsonResponse } = err;
	console.log(`Error Code ${v4()}`)
	console.log(`Error status: ${status}`);
	console.log(`Error Message: ${message}`);

	if (!jsonResponse) res.sendStatus(status);
	else res.status(status).json(jsonResponse);
});

const main = () => {
	db.connect("mongodb://database:27017/", "cosignage", ["visits", "carts"], {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		poolSize: 50
	});

	app.listen(80, () => {
		console.log("Listening on port 80");
	});
};

main();
