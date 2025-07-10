const taxRateServices = require("../../services/tax-rate.service");
const { getTaxRateByIdValidationSchema } = require("../../utils/validation/tax-rate.validation");

const getTaxRateById = async (request, response) => {
    try {
        const { id } = request.params;

        // Validate the ID
        await getTaxRateByIdValidationSchema.validate({ id });

        // Fetch Tax Rate from DB
        const taxRate = await taxRateServices.getTaxRateId(id);
        if (taxRate) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Tax Rate not found",
                data: taxRate,
            });

        } else {
            return response.status(404).json({
                status: "FAILED",
                message: "Tax Rate not found",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getTaxRateById;
