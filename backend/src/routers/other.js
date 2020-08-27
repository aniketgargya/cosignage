const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const { body } = require("express-validator");
const { validate } = require("../middleware");

const router = express.Router();

router.post("/message",
    [
        body("name").isLength({ min: 1 }).withMessage("Name cannot be empty"),
        body("businessName").isLength({ min: 1 }).withMessage("Business Name cannot be empty"),
        body("email").isEmail().withMessage("Email must be a valid email"),
        body("message").isLength({ min: 1 }).withMessage("Message cannot be empty"),
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { name, businessName, email, message } = req.body;

        await db.messages.insertOne({ name, businessName, email, message });

        res.sendStatus(200);
    })
);

module.exports = { router };

