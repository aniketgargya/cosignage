const express = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Cart, cartData, String } = require("../types");
const createError = require("http-errors");

const router = express.Router();

const stringWithoutValue = s => !String.guard(s) || s.trim() === "";

router.post("/checkout-session", asyncHandler(async (req, res) => {
    const { userId, cart, name, street, lineTwo = "", city, state, zip, country } = req.body;

    if (!Cart.guard(cart) || Object.keys(cart).length === 0) throw new createError(400, undefined, { jsonResponse: { error: "Invalid Cart" } });
    if (stringWithoutValue(name)) throw new createError(400, undefined, { jsonResponse: { error: "Name cannot be empty" } });
    if (stringWithoutValue(street)) throw new createError(400, undefined, { jsonResponse: { error: "Street Address cannot be empty" } });
    if (!String.guard(lineTwo)) throw new createError(400, undefined, { jsonResponse: { error: "Street Address Line 2 must be text" } });
    if (stringWithoutValue(city)) throw new createError(400, undefined, { jsonResponse: { error: "City cannot be empty" } });
    if (stringWithoutValue(state)) throw new createError(400, undefined, { jsonResponse: { error: "State / Province / Region cannot be empty" } });
    if (stringWithoutValue(zip)) throw new createError(400, undefined, { jsonResponse: { error: "ZIP Code cannot be empty" } });
    if (stringWithoutValue(country)) throw new createError(400, undefined, { jsonResponse: { error: "Country cannot be empty" } });

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
        success_url: `http://${process.env.DOMAIN}/success`,
        cancel_url: `http://${process.env.DOMAIN}/checkout`,
        payment_intent_data: {
            metadata: { userId, name, street, lineTwo, city, state, zip, country }
        }
    });

    res.json({ id });
}));

module.exports = { router };
