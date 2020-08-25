const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const { UserId, Cart } = require("../types");
const createError = require("http-errors");

const router = express.Router();

router.post("/visit", asyncHandler(async (req, res) => {
    const { ipInfo, body } = req;
    const { userId } = body;

    if (UserId.guard(userId)) {
        await db.visits.insertOne({
            userId,
            ipInfo,
            time: Date(Date.now())
        });

        res.sendStatus(200);
    } else {
        throw createError(400, undefined);
    }
}));

router.post("/cart", asyncHandler(async (req, res) => {
    const { ipInfo, body } = req;
    const { userId, cart } = body;

    if (UserId.guard(userId) && Cart.guard(cart)) {
        await db.carts.updateOne({ userId }, {
            $set: {
                cart,
                ipInfo,
                time: Date(Date.now())
            }
        }, { upsert: true });

        res.sendStatus(200);
    } else {
        throw createError(400, undefined);
    }
}));

module.exports = { router };