const createTaxRate = require("../controllers/tax-rate/create-tax-rate");
const getTaxRate = require("../controllers/tax-rate/get-tax-rate");
const updateTaxRate = require("../controllers/tax-rate/update-tax-rate");
const deleteTaxRate = require("../controllers/tax-rate/delete-tax-rate");
const getTaxRateById = require("../controllers/tax-rate/getTaxRateById");

const createReadyRecanaRate = require("../controllers/tax-rate/create-ReadyRecanaRate");
const getReadyRecanaRate = require("../controllers/tax-rate/get-readyRecanaRate");
const updateReadyRecanaRate = require("../controllers/tax-rate/update-ReadyRecanaRate");
const deleteReadyRecanaRate = require("../controllers/tax-rate/delete-ReadyRecanaRate");
const getReadyRecanaRateById = require("../controllers/tax-rate/getReadyRecanaRateById");

const taxRate = require("../utils/helper/taxRate");
const authenticateUserJWT = require("../utils/middleware/auth");


const TaxRoutes = require("express").Router();


TaxRoutes.post("/create-tax", authenticateUserJWT, createTaxRate)
TaxRoutes.post("/get-tax-list", authenticateUserJWT, getTaxRate)
TaxRoutes.post("/update-taxRate", authenticateUserJWT, updateTaxRate)
TaxRoutes.post("/delete-taxRate", authenticateUserJWT, deleteTaxRate)
TaxRoutes.get("/getTaxRateById", authenticateUserJWT, getTaxRateById)


TaxRoutes.post("/create-readyRecanaRate", authenticateUserJWT, createReadyRecanaRate)
TaxRoutes.post("/get-readyRecanaRate-list", authenticateUserJWT, getReadyRecanaRate)
TaxRoutes.post("/update-readyRecanaRate-list", authenticateUserJWT, updateReadyRecanaRate)
TaxRoutes.post("/delete-readyRecanaRate-list", authenticateUserJWT, deleteReadyRecanaRate)
TaxRoutes.post("/getReadyRecanaRateById", authenticateUserJWT, getReadyRecanaRateById)


module.exports = TaxRoutes