const express = require("express");
const expressIp = require("express-ip");
const db = require("./db");
const { analyticsRouter, paymentRouter, otherRouter, adminRouter, stripeRouter } = require("./routers");
const { v4 } = require("uuid");
const createError = require("http-errors");

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(expressIp().getIpInfoMiddleware);

app.get("/", (req, res) => { res.sendStatus(200); });
app.use("/a", analyticsRouter);
app.use("/p", paymentRouter);
app.use("/o", otherRouter);
app.use("/s", adminRouter);
app.use("/stripe", stripeRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	const { status = 500, responseData, message } = err;
	const errorCode = v4();

	if (status === 500) {
		console.log(`Error Code: ${errorCode}`)
		console.log(`Error Message: ${message}`);
	}

	if (status === 500) res.status(status).json({ errorCode });
	else res.status(status).json(responseData);
});

const main = async () => {
	await db.connect("mongodb://database:27017/", "cosignage", ["visits", "carts", "messages", "items", "purchases", "emails"], {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		poolSize: 50
	});

	app.listen(80, () => {
		console.log("Listening on port 80");
	});
};

main();
