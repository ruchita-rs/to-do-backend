const createTodoList = require("../controllers/toDoList/Create");
const toDoList = require("../models/toDoList.models");
const { ObjectId } = require("mongodb")


const toDoListServices = {
    createTodoList: async (dataToInsert) => {
        try {
            return await toDoList.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    gettoDoListId: async (id) => {
        try {
            return await toDoList.findOne({_id: new ObjectId(id)});
        } catch (error) {
            throw error;
        }
    },

    updatetoDoList: async (id, dataToUpdate) => {
        try {
            return await toDoList.updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate });
        } catch (error) {
            throw error;
        }
    },
    deletetoDoList: async (id) => {
        try {
            return await toDoList.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
    

}

module.exports = toDoListServices;