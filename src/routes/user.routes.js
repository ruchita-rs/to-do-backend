const createUser = require("../controllers/user/create-user");
const deleteSelectedUser = require("../controllers/user/delete-user");
const getUserList = require("../controllers/user/get-user-list");
const login = require("../controllers/user/login");
const updateUser = require("../controllers/user/update-user");
const authenticateUserJWT = require("../utils/middleware/auth");

const userRoutes = require("express").Router();

userRoutes.post("/login", login)
userRoutes.post("/create-user", authenticateUserJWT, createUser)
userRoutes.post("/get-user-list", authenticateUserJWT, getUserList)
userRoutes.post("/update-user", authenticateUserJWT, updateUser)
userRoutes.post("/delete-user", authenticateUserJWT, deleteSelectedUser)





module.exports = userRoutes;