const express = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Cart, cartData } = require("../types");
const { body } = require("express-validator");
const { validate } = require("../middleware");

const router = express.Router();

router.post("/checkout-session",
    [
        body("cart").custom(cart => Cart.guard(cart)).withMessage("Invalid cart")
            .custom(cart => Object.keys(cart).length > 0).withMessage("Cart cannot be empty"),
        body("name").isLength({ min: 1 }).withMessage("Name cannot be empty"),
        body("street").isLength({ min: 1 }).withMessage("Street Address cannot be empty"),
        body("city").isLength({ min: 1 }).withMessage("City cannot be empty"),
        body("state").isLength({ min: 1 }).withMessage("State/Province/Region cannot be empty"),
        body("zip").isLength({ min: 1 }).withMessage("ZIP/Postal Code cannot be empty"),
        body("country").isLength({ min: 1 }).withMessage("Country cannot be empty")
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { userId, cart, name, street, lineTwo, city, state, zip, country } = req.body;

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
    })
);

module.exports = { router };
