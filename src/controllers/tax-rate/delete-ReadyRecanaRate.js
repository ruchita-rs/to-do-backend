const readyRecanaRateServices = require("../../services/readyRecanaRate.service");
const { deleteReadyRecanaRateValidationSchema } = require("../../utils/validation/tax-rate.validation");

const deleteReadyRecanaRate = async (request, response) => {
    try {
        const { id } = request.body;

        // Validate ID using Joi (synchronous)
        const { error } = deleteReadyRecanaRateValidationSchema.validate({ id });
        if (error) {
            return response.status(200).json({
                status: "FAILED",
                message: error.details[0].message,
            });
        }

        // Check if tax rate exists
        const existingReadyRecanaRate = await readyRecanaRateServices.getReadyRecanaRateId(id);
        if (!existingReadyRecanaRate) {
            return response.status(404).json({
                status: "FAILED",
                message: "Tax Rate not found",
            });
        }

        // Proceed to delete
        const result = await readyRecanaRateServices.deleteReadyRecanaRate(id);
        console.log(result);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Tax Rate deleted successfully",
            });
        } else {
            return response.status(500).json({
                status: "FAILED",
                message: "Failed to delete Tax Rate",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteReadyRecanaRate;