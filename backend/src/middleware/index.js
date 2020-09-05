const { validationResult } = require("express-validator");
const createError = require("http-errors");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const [{ msg: { status, message } }] = errors.array();
        throw new createError(status, undefined, { responseData: { message } });
    } else {
        next();
    }
};

module.exports = { validate };