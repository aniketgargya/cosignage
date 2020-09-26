const { router: analyticsRouter } = require("./analytics");
const { router: paymentRouter } = require("./payment");
const { router: otherRouter } = require("./other");
const { router: adminRouter } = require("./admin");
const { router: stripeRouter } = require("./stripe");

module.exports = { analyticsRouter, paymentRouter, otherRouter, adminRouter, stripeRouter };
