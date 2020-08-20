const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/visit", async (req, res) => {
    try {
        const { ipInfo, body } = req;
        const { userId } = body;

        await db.visits.insertOne({
            userId,
            ipInfo,
            time: Date(Date.now())
        });

        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

router.post("/cart", async (req, res) => {
    try {
        const { ipInfo, body } = req;
        const { userId, cart } = body;

        await db.carts.updateOne({ userId }, {
            userId,
            cart,
            ipInfo,
            time: Date(Date.now())
        }, { upsert: true });

        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = { router };