
const ToDoRoutes = require("./toDoList.routes");



const routes = require("express").Router();


routes.use("/ToDo", ToDoRoutes);

module.exports = routes;