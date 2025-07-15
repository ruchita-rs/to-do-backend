const Joi = require("joi");
const { ObjectId } = require("mongodb");

const objectIdValidator = (value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

exports.checktoDoListValidationSchema = Joi.object({

    title:Joi.string().required(),
    description: Joi.string().required(),
    priority:Joi.string().required(),
    category: Joi.string().required(),
    duedate: Joi.string().optional(),
    time:Joi.string().optional(),
});

exports.updatetoDoListSchema = Joi.object({
    id: Joi.string().required(),
    title:Joi.string().required(),
    description: Joi.string().required(),
    priority:Joi.string().required(),
    category: Joi.string().required(),
    duedate: Joi.string().optional(),
    time:Joi.string().optional (),
});

exports.updatetoDoListValidationSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
        "any.required": "toDoList ID is required",
        "any.invalid": "Invalid toDoList ID",
    }),
   title:Joi.string().required(),
    description: Joi.string().required(),
    priority:Joi.string().required(),
    category: Joi.string().required(),
     duedate: Joi.string().required(),
    time:Joi.string().required(),
});

exports.deletetoDoListValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
});


exports.gettoDoListByIdValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
});

