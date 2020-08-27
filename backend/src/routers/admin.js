const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const { body, query } = require("express-validator");
const { validate } = require("../middleware");
const createError = require("http-errors");

const router = express.Router();

router.use(cookieParser());

router.post("/sign-in",
    [
        body("password").isLength({ min: 1 }).withMessage("Please enter a password")
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { password } = req.body;
        const hashedPassword = crypto.createHmac("sha1", process.env.SALT).update(password).digest("hex");

        if (hashedPassword === process.env.HASHED_PASSWORD) {
            res.cookie("token", jwt.sign({ token: process.env.JWT_DECRYPTED_TOKEN }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }), { expiresIn: 60 * 60 });
            res.sendStatus(200);
        } else {
            throw new createError(403);
        }
    })
);

router.use((req, res, next) => {
    try {
        const { token } = jwt.verify(req.cookies["token"], process.env.JWT_SECRET);
        if (token != process.env.JWT_DECRYPTED_TOKEN) throw new Error();
        res.cookie("token", jwt.sign({ token: process.env.JWT_DECRYPTED_TOKEN }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }), { expiresIn: 60 * 60 });
        next();
    } catch {
        throw new createError(403);
    }
});

router.get("/", (req, res) => {
    res.sendStatus(200);
});


router.get("/messages",
    [
        query("skip").isNumeric().withMessage("Skip must be a number").toInt(),
        query("limit").isNumeric().withMessage("Limit must be a number").toInt()
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { skip, limit, ip, userId } = req.query;
        const response = await db.messages.find({ ip, userId }).skip(skip).limit(limit).toArray();
        res.json({ data: response });
    })
);

router.get("/visits",
    [
        query("skip").isNumeric().withMessage("Skip must be a number").toInt(),
        query("limit").isNumeric().withMessage("Limit must be a number").toInt()
    ],
    asyncHandler(async (req, res) => {
        const { skip, limit, ip, userId } = req.query;
        const response = await db.visits.find({ "ipInfo.ip": ip, userId }).skip(skip).limit(limit).toArray();
        res.json({ data: response });
    })
);

router.get("/carts",
    [
        query("skip").isNumeric().withMessage("Skip must be a number").toInt(),
        query("limit").isNumeric().withMessage("Limit must be a number").toInt()
    ],
    asyncHandler(async (req, res) => {
        const { skip, limit, ip, userId } = req.query;
        const response = await db.visits.find({ "ipInfo.ip": ip, userId }).skip(skip).limit(limit).toArray();
        res.json({ data: response });
    })
);

module.exports = { router };