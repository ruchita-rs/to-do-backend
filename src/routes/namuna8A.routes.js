const createNamuna8A = require("../controllers/namuna8A/create-namuna8a");
const deleteNamuna8A = require("../controllers/namuna8A/delete-namuna8a");
const generateNamuna8APdf = require("../controllers/namuna8A/generate-namuna8A-pdf");
const getNamuna8AList = require("../controllers/namuna8A/get-namuba8a-list");
const updateNamuna8A = require("../controllers/namuna8A/update-namuna8a");
const authenticateUserJWT = require("../utils/middleware/auth");



const namuna8ARoutes = require("express").Router();

namuna8ARoutes.post("/create-namuna8a", authenticateUserJWT, createNamuna8A)
namuna8ARoutes.post("/get-namuna8a-list", authenticateUserJWT, getNamuna8AList)
namuna8ARoutes.get("/generate-namuna-8a", generateNamuna8APdf)
namuna8ARoutes.post("/update-namuna8a", authenticateUserJWT, updateNamuna8A)
namuna8ARoutes.post("/delete-namuna8a", authenticateUserJWT, deleteNamuna8A)



module.exports = namuna8ARoutes;