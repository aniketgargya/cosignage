const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/visit", async (req, res) => {
    try {
        const { ipInfo, body } = req;
        const { userId } = body;

        await db.visits.insertOne({
            userId,
            ipInfo,
            time: Date(Date.now())
        });

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get("/cart", async (req, res) => {
    try {
        const { ipInfo, body } = req;
        const { userId, cart } = body;

        if (userId) {
            await db.carts.updateOne({ userId }, {
                $set: {
                    cart,
                    ipInfo,
                    time: Date(Date.now())
                }
            }, { upsert: true });
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = { router };