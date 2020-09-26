const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ObjectID } = require("mongodb");

const router = express.Router();

router.post("/",
    asyncHandler(async (req, res) => {
        const event = req.body;

        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSession = event.data.object;

                const lineItems = await stripe.checkout.sessions.listLineItems(
                    checkoutSession.id,
                    { limit: 100 }
                );

                const paymentIntent = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent);

                for (let i = 0; i < lineItems.data.length; i++) {
                    const lineItem = lineItems.data[i];

                    const product = await stripe.products.retrieve(lineItem.price.product);

                    lineItem.product = product;

                    if (product.name != "Tax") {
                        await db.items.updateOne(
                            { _id: ObjectID(product.metadata.cartItemId), "variations.variationId": product.metadata.variationId },
                            { $inc: { "variations.$.stock": -1 * lineItem.quantity } }
                        );
                    }
                }

                checkoutSession.payment_intent = paymentIntent;
                checkoutSession.line_items = lineItems;

                await db.purchases.insertOne(checkoutSession);

                break;
            default:
                console.log(`Unknown Event: ${JSON.stringify(event)}`);
                break;
        }

        res.json({ received: true });
    })
);

module.exports = { router };
