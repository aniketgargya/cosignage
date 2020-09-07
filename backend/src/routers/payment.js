const express = require("express");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Cart, MongoObjectID } = require("../types");
const { body, param } = require("express-validator");
const { validate } = require("../middleware");
const db = require("../db");
const { ObjectID } = require("mongodb");

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

router.get("/products", asyncHandler(async (req, res) => {
    const products = await db.items.find().toArray();
    products.forEach(product => {
        const totalStock = product.variations.reduce((a, b) => a + b.stock, 0);

        if (totalStock > 10) {
            product.stockStatus = "In Stock";
        } else if (totalStock > 0) {
            product.stockStatus = "Low Stock";
        } else {
            product.stockStatus = "Out of Stock";
        }

        product.startingPrice = product.variations.reduce((a, b) => a > b.price ? b.price : a, product.variations[0].price);

        delete product.variations;
    });
    res.json({ products });
}));

router.get("/products/:_id",
    [
        param("_id").custom(productId => MongoObjectID.guard(productId)).withMessage({ status: 400, message: "Invalid Product ID" }).bail()
            .customSanitizer(productId => ObjectID(productId))
    ],
    validate,
    asyncHandler(async (req, res) => {
        const { _id } = req.params;
        const product = await db.items.findOne({ _id });
        res.json({ product });
    })
);

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
