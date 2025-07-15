const createTodoList = require("../controllers/toDoList/Create");
const deletetoDoList = require("../controllers/toDoList/Delete");
const getAllTodos = require("../controllers/toDoList/get-all-list");
const gettoDoListById = require("../controllers/toDoList/getById");
const updatetoDoList = require("../controllers/toDoList/Update");



const ToDoRoutes = require("express").Router();


ToDoRoutes.post("/create-ToDo", createTodoList)
ToDoRoutes.post("/update-ToDo", updatetoDoList)
ToDoRoutes.post("/delete-ToDo", deletetoDoList)
ToDoRoutes.get("/gettoDoListById", gettoDoListById)
ToDoRoutes.get("/get-all-toDoList",getAllTodos)






module.exports = ToDoRoutes