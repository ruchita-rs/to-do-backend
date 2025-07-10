const Joi = require("joi");
const { ObjectId } = require("mongodb");

const objectIdValidator = (value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

exports.checkTaxRateValidationSchema = Joi.object({
    description: Joi.string().required(),
    rate: Joi.number().required(),
});

exports.updateTaxRateValidationSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
        "any.required": "Tax Rate ID is required",
        "any.invalid": "Invalid Tax Rate ID",
    }),
    description: Joi.string().required(),
    rate: Joi.number().required(),
});

exports.updateReadyRecanaRateValidationSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
        "any.required": "Tax Rate ID is required",
        "any.invalid": "Invalid Tax Rate ID",
    }),
    description: Joi.string().required(),
    rate: Joi.number().required(),
});

exports.deleteTaxRateValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
});

exports.getTaxRateByIdValidationSchema = Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
        "any.required": "Tax Rate ID is required",
        "any.invalid": "Invalid Tax Rate ID",
    }),
});

exports.deleteReadyRecanaRateValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
});
