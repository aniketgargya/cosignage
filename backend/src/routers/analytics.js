const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const { UserId, Cart } = require("../types");
const { body } = require("express-validator");
const { validate } = require("../middleware");

const router = express.Router();

router.post("/visit",
    [
        body("userId").custom(userId => UserId.guard(userId)).withMessage({ status: 400, message: "Invalid User Id" })
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
        body("userId").custom(userId => UserId.guard(userId)).withMessage({ status: 400, message: "Invalid User Id" }),
        body("cart").custom(async cart => {
            const response = await Cart.guard(cart);
            if (!response) return Promise.reject();
        }).withMessage({ status: 400, message: "Invalid cart" })
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