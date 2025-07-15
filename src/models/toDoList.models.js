const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
title:{
    type:String,
    required: true,
    
},

    description: {
        type: String,
        required: true,
        
    },
   priority: {
        type: String,
        required: true,
        enum:["medium","low","high"],
        default:["medium"]
    },
    category:{
        type: String,
        required: true,
        enum:["Work","Person"],
        default:["Work"],
        

    },
    duedate:{
        type:String

    },
    time:{
        type:String

    },
   
}, {
    timestamps: true, 
    strict: false
}
);

const toDoList = mongoose.model(' toDoList', toDoListSchema);

module.exports =  toDoList;