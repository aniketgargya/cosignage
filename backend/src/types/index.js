const { String, Partial, Record, Number } = require("runtypes");
const { version, validate } = require("uuid");

const UserId = String.withConstraint(s => validate(s) && version(s) === 1);

const NonNegativeNumber = Number.withConstraint(n => n >= 0);

const Cart = Record({}).And(Partial({
    "curbsidePickup": NonNegativeNumber,
    "maskRequired": NonNegativeNumber
}));

module.exports = { UserId, Cart };