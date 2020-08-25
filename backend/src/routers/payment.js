const express = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../db");
const { Cart, cartData } = require("../types");
const createError = require("http-errors");

const router = express.Router();

router.post("/checkout-session", asyncHandler(async (req, res) => {
    const { cart } = req.body;

    if (Cart.guard(cart)) {
        const { id } = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: Object.keys(cart).map(cartItemId => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cartData[cartItemId].name
                    },
                    unit_amount: cartData[cartItemId].price
                },
                quantity: cart[cartItemId]
            })),
            mode: "payment",
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
            payment_intent_data: {
                metadata: { "works": "yes?" }
            }
        });

        res.json({ id });
    } else {
        throw new createError(400);
    }
}));

module.exports = { router };