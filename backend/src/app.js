const express = require("express");
const expressIp = require("express-ip");
const db = require("./db");
const { analyticsRouter } = require("./routers");

const app = express();

app.set("trust proxy", "loopback");
app.use(express.json());
app.use(expressIp().getIpInfoMiddleware);

app.use("/analytics", analyticsRouter);

const main = async () => {
	await db.connect("mongodb://database:27017/", "cosignage", ["visits"], {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		poolSize: 50
	});

	app.listen(80, () => {
		console.log("Listening on port 80");
	});
};

main();
