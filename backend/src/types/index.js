const { String, Partial, Number, Record } = require("runtypes");
const { version, validate } = require("uuid");

const UserId = String.withConstraint(s => validate(s) && version(s) === 1);

const PositiveNumber = Number.withConstraint(n => n > 0);

const cartData = {
    "maskRequired": {
        name: "Mask Required",
        imageUrl: undefined,
        price: 100
    },
    "curbsidePickup": {
        name: "Curbside Pickup",
        imageUrl: undefined,
        price: 150
    }
};

const Cart = Partial(Object.keys(cartData).reduce((accumulator, currentValue) => ({
    ...accumulator,
    [currentValue]: PositiveNumber
}), {})).withConstraint(r => {
    if (r && Record({}).guard(r)) {
        return Object.keys(r).every(cartItem => Object.keys(cartData).includes(cartItem));
    } else {
        return false;
    }
});

module.exports = { UserId, Cart, cartData };
