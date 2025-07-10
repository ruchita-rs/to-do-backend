const namuna8ARoutes = require("./namuna8A.routes");
const TaxRoutes = require("./taxRate.routes");
const userRoutes = require("./user.routes");


const routes = require("express").Router();


routes.use("/user", userRoutes);
routes.use("/namuna8a", namuna8ARoutes);
routes.use("/taxrate", TaxRoutes);

module.exports = routes;