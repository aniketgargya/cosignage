const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const router = express.Router();

router.use(cookieParser());

router.post("/sign-in", asyncHandler(async (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        throw new createError(403);
    } else {
        const hashedPassword = crypto.createHmac("sha1", process.env.SALT).update(password).digest("hex");

        if (hashedPassword === process.env.HASHED_PASSWORD) {
            res.cookie("token", jwt.sign({ token: process.env.JWT_TOKEN }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }), { expiresIn: 60 * 60 });
            res.sendStatus(200);
        } else {
            throw new createError(403);
        }
    }
}));

router.use(asyncHandler(async (req, res, next) => {
    let token;
    try {
        token = jwt.verify(req.cookies["token"], process.env.JWT_SECRET).token;
    } catch {
        throw new createError(403);
    }

    if (token != process.env.JWT_TOKEN) {
        throw new createError(403);
    } else {
        res.cookie("token", jwt.sign({ token: process.env.JWT_TOKEN }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }), { expiresIn: 60 * 60 });
        next();
    }
}));

router.get("/", (req, res) => {
    res.sendStatus(200);
});


router.get("/messages", asyncHandler(async (req, res) => {
    const response = await db.messages.find().toArray();
    res.json({ data: response });
}));

module.exports = { router };