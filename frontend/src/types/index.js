const { String, Partial, Number, Record } = require("runtypes");
const { version, validate } = require("uuid");

const UserId = String.withConstraint(s => validate(s) && version(s) === 1);

const NonNegativeNumber = Number.withConstraint(n => n >= 0);

const cartItems = ["maskRequired", "curbsidePickup"];

const Cart = Partial(cartItems.reduce((accumulator, currentValue) => ({
    ...accumulator,
    [currentValue]: NonNegativeNumber
}), {})).withConstraint(r => {
    if (r && Record({}).guard(r)) {
        return Object.keys(r).every(cartItem => cartItems.includes(cartItem));
    } else {
        return false;
    }
});

Cart.check({});

module.exports = { UserId, Cart };