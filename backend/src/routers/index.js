const { router: analyticsRouter } = require("./analytics");
const { router: paymentRouter } = require("./payment");
const { router: adminRouter } = require("./admin");

module.exports = { analyticsRouter, paymentRouter, adminRouter };
