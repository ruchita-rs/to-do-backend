const toDoList = require("../../models/toDoList.models");



const getAllTodos = async(req,res)=>{
    try{
        const todos = await toDoList.find();
        res.status(200).json(todos);
        console.log(todos);
        
    } catch(error) {
        res.status(500).json({
            status:"FAILED",
            message:error.message,
        });
    }
    };
module.exports = getAllTodos