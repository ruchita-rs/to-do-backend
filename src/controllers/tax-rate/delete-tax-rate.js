const taxRateServices = require("../../services/tax-rate.service");
const { deleteTaxRateValidationSchema } = require("../../utils/validation/tax-rate.validation");

const deleteTaxRate = async (request, response) => {
    try {
        const { id } = request.body;

        // Validate ID using Joi (synchronous)
        const { error } = deleteTaxRateValidationSchema.validate({ id });
        if (error) {
            return response.status(400).json({
                status: "FAILED",
                message: error.details[0].message,
            });
        }

        // Check if tax rate exists
        const existingTaxRate = await taxRateServices.getTaxRateId(id);
        if (!existingTaxRate) {
            return response.status(404).json({
                status: "FAILED",
                message: "Tax Rate not found",
            });
        }

        // Proceed to delete
        const result = await taxRateServices.deleteTaxRateById(id);
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

module.exports = deleteTaxRate;
