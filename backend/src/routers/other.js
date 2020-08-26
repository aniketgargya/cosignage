const express = require("express");
const asyncHandler = require("express-async-handler");
const { String } = require("../types");
const createError = require("http-errors");
const db = require("../db");

const router = express.Router();

const stringWithoutValue = s => !String.guard(s) || s.trim() === "";

router.post("/message", asyncHandler(async (req, res) => {
    const { name, businessName, emailAddress, message } = req.body;

    if (stringWithoutValue(name)) throw new createError(400, undefined, { jsonResponse: { error: "Name cannot be empty" } });
    if (stringWithoutValue(businessName)) throw new createError(400, undefined, { jsonResponse: { error: "Business Name cannot be empty" } });
    if (stringWithoutValue(emailAddress)) throw new createError(400, undefined, { jsonResponse: { error: "Email Address cannot be empty" } });
    if (stringWithoutValue(message)) throw new createError(400, undefined, { jsonResponse: { error: "Message cannot be empty" } });

    await db.messages.insertOne({ name, businessName, emailAddress, message });

    res.sendStatus(200);

}));

module.exports = { router };

