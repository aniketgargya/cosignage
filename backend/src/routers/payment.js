const express = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Cart } = require("../types");
const { body } = require("express-validator");
const { validate } = require("../middleware");

const router = express.Router();

router.post("/cart",
    [
        body("cart").custom(async cart => {
            const response = await Cart.guard(cart);
            if (!response) return Promise.reject();
        }).withMessage({ status: 400, message: "Invalid cart" })
    ],
    validate,
    (req, res) => {
        res.sendStatus(200);
    }
);

router.get("/product/:productId", () => {

});

router.post("/checkout-session",
    [
        body("cart").custom(cart => Cart.guard(cart)).withMessage({ status: 400, message: "Invalid cart" })
            .custom(cart => Object.keys(cart).length > 0).withMessage({ status: 400, message: "Cart cannot be empty" }),
        body("name").isLength({ min: 1 }).withMessage({ status: 400, message: "Name cannot be empty" }),
        body("street").isLength({ min: 1 }).withMessage({ status: 400, message: "Street Address cannot be empty" }),
        body("city").isLength({ min: 1 }).withMessage({ status: 400, message: "City cannot be empty" }),
        body("state").isLength({ min: 1 }).withMessage({ status: 400, message: "State/Province/Region cannot be empty" }),
        body("zip").isLength({ min: 1 }).withMessage({ status: 400, message: "ZIP/Postal Code cannot be empty" })
            .custom(zip => ["61874", "00000"].includes(zip)).withMessage({ status: 400, message: "Sorry, we do not deliever to that location yet" }),
        body("country").isLength({ min: 1 }).withMessage({ status: 400, message: "Country cannot be empty" })
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { userId, ipInfo, cart, name, street, lineTwo, city, state, zip, country } = req.body;

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
                metadata: { userId, ipInfo, name, street, lineTwo, city, state, zip, country }
            }
        });

        res.json({ id });
    })
);

module.exports = { router };
