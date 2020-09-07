const { String, Number, Array, Record } = require("runtypes");
const { version, validate } = require("uuid");
const { ObjectID: { isValid: isValidObjectID }, ObjectID } = require("mongodb");
const db = require("../db");

const UserId = String.withConstraint(s => validate(s) && version(s) === 1);

const WholeNumber = Number.withConstraint(n => n >= 0);

const MongoObjectID = String.withConstraint(s => isValidObjectID(s));

const Cart = {
    guard: async cart => {
        try {
            Record({}).check(cart);

            const cartItemKeys = Object.keys(cart);
            for (let i = 0; i < cartItemKeys.length; i++) {
                const cartItem = cart[cartItemKeys[i]];

                const query = {
                    _id: ObjectID(cartItemKeys[i])
                };

                const cartItemVariationKeys = Object.keys(cartItem);

                cartItemVariationKeys.forEach(cartItemVariationKey => {
                    WholeNumber.check(cartItem[cartItemVariationKey]);
                });

                if (cartItemVariationKeys.length > 0) {
                    query.variations = {
                        $all: cartItemVariationKeys.map(cartItemVariationKey => (
                            { $elemMatch: { variationId: cartItemVariationKey } }
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

module.exports = { UserId, Cart, String, MongoObjectID };
