const { checkTaxRateValidationSchema } = require("../../utils/validation/tax-rate.validation");
const taxRateServices = require("../../services/tax-rate.service");

const createTaxRate = async (request, response) => {
    try {
        //extract data from request body
        const { description, rate } = request.body;

        //check validation
        const validationResult = await checkTaxRateValidationSchema.validate({ description, rate }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        //check already exist with description
        const isDescExist = await taxRateServices.getTaxRateDescription(description)
        if (isDescExist) {
            response.status(200).json({
                status: "FAILED",
                message: "Tax Rate for selected Description is Already exist, please update it",
            });
            return;
        }

        //insert data into db & send response to client
        const result = await taxRateServices.createTaxRate({description,rate});
        if (result._id) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Tax Rate Added successfully",
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to add Tax Rate, Please try again!",
            });
            return;
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createTaxRate;