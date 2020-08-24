const express = require("express");
const db = require("../db");
const { UserId, Cart } = require("../types");

const router = express.Router();

router.post("/visit", async (req, res) => {
    const { ipInfo, body } = req;
    const { userId } = body;

    if (UserId.guard(userId)) {

        try {
            await db.visits.insertOne({
                userId,
                ipInfo,
                time: Date(Date.now())
            });

            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }

    } else {
        res.sendStatus(400);
    }
});

router.post("/cart", async (req, res) => {
    const { ipInfo, body } = req;
    const { userId, cart } = body;

    if (UserId.check(userId) && Cart.check(cart)) {

        try {
            await db.carts.updateOne({ userId }, {
                $set: {
                    cart,
                    ipInfo,
                    time: Date(Date.now())
                }
            }, { upsert: true });

            res.sendStatus(200);
        } catch {
            res.sendStatus(500);
        }

    } else {
        res.sendStatus(400);
    }
});

module.exports = { router };