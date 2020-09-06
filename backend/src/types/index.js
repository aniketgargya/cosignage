const { String, Number, Array, Record } = require("runtypes");
const { version, validate } = require("uuid");
const { ObjectID: { isValid: isValidObjectID }, ObjectID } = require("mongodb");
const db = require("../db");
const { json } = require("express");

const UserId = String.withConstraint(s => validate(s) && version(s) === 1);

const WholeNumber = Number.withConstraint(n => n >= 0);

const MongoObjectID = String.withConstraint(s => isValidObjectID(s));

const Variation = Record({
    variationId: String,
    quantity: WholeNumber
});

const CartItem = Record({
    _id: MongoObjectID,
    variations: Array(Variation)
});

const Cart = {
    guard: async cart => {
        try {
            Array(CartItem).check(cart);

            for (let i = 0; i < cart.length; i++) {
                const cartItem = cart[i];

                const query = {
                    _id: ObjectID(cartItem._id)
                };

                if (cartItem.variations.length > 0) {
                    query.variations = {
                        $all: cartItem.variations.map(({ variationId }) => (
                            { $elemMatch: { variationId } }
                        ))
                    };
                }

                const matches = await db.items.find(query).limit(1).toArray();

                if (matches.length === 0) return false;
            }

            return true;
        } catch {
            return false;
        }
    }
};

module.exports = { UserId, Cart, String };
