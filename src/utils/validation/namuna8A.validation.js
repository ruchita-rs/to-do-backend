const Joi = require("joi");
const { ObjectId } = require("mongodb");

const objectIdValidator = (value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

exports.updateNamunaValidationSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
        "any.required": "Namuna 8A ID is required",
        "string.base": "Namuna 8A ID must be a string",
        "any.invalid": "Invalid Namuna 8A ID",
    }),
});

