const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const { body } = require("express-validator");
const { validate } = require("../middleware");

const router = express.Router();

router.post("/message",
    [
        body("name").trim().isLength({ min: 1 }).withMessage({ status: 400, message: "Name cannot be empty" }),
        body("businessName").trim().customSanitizer(businessName => businessName === "" ? undefined : businessName),
        body("email").isEmail().withMessage({ status: 400, message: "Email must be a valid email" }),
        body("message").isLength({ min: 1 }).withMessage({ status: 400, message: "Message cannot be empty" }),
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { userId, name, businessName, email, message } = req.body;

        await db.messages.insertOne({ userId, name, businessName, email, message });

        res.sendStatus(200);
    })
);

router.post("/email",
    [
        body("email").isEmail().withMessage({ status: 400, message: "Email must be a valid email" })
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { userId, email } = req.body;

        await db.emails.updateOne(
            { email },
            {
                $set: {
                    userId,
                    subscribed: true
                }
            },
            { upsert: true }
        );

        res.sendStatus(200);
    })
);

module.exports = { router };

