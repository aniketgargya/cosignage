const { validationResult } = require("express-validator");
const createError = require("http-errors");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const [{ msg: error }] = errors.array();
        throw new createError(400, undefined, { jsonResponse: { error } });
    } else {
        next();
    }
};

module.exports = { validate };