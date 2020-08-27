const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const { UserId, Cart } = require("../types");
const { body } = require("express-validator");
const { validate } = require("../middleware");

const router = express.Router();

router.post("/visit",
    [
        body("userId").custom(userId => UserId.guard(userId)).withMessage("Invalid userId")
    ],
    validate,
    asyncHandler(async (req, res) => {

        const { ipInfo } = req;
        const { userId } = req.body;

        await db.visits.insertOne({
            userId,
            ipInfo,
            time: Date(Date.now())
        });

        res.sendStatus(200);
    })
);

router.post("/cart",
    [
        body("userId").custom(userId => UserId.guard(userId)).withMessage("Invalid userId"),
        body("cart").custom(cart => Cart.guard(cart)).withMessage("Invalid cart")
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { ipInfo } = req.body;
        const { userId, cart } = req.body;

        await db.carts.updateOne({ userId }, {
            $set: {
                cart,
                ipInfo,
                time: Date(Date.now())
            }
        }, { upsert: true });

        res.sendStatus(200);
    })
);

module.exports = { router };