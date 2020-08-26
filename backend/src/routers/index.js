const { router: analyticsRouter } = require("./analytics");
const { router: paymentRouter } = require("./payment");
const { router: otherRouter } = require("./other");
const { router: adminRouter } = require("./admin");

module.exports = { analyticsRouter, paymentRouter, otherRouter, adminRouter };
