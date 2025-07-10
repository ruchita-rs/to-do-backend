const Joi = require("joi");
const { ObjectId } = require("mongodb");

const objectIdValidator = (value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};
exports.createUserValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Invalid mobile number format',
    }),
    password: Joi.string().required(),
});
exports.updateUserValidationSchema = Joi.object({
    userId: Joi.string().custom(objectIdValidator).required().messages({
        "any.required": "ID is required",
        "any.invalid": "Invalid ID",
    }),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Invalid mobile number format',
    }),
    password: Joi.string().required(),
});
exports.userIdsValidationSchema = Joi.object().keys({
    userIds: Joi.array().min(1).items(Joi.string().required()).required()
});

//validation for login
exports.loginValidationSchema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().min(8).max(16).required(),
});