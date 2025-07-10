const readyRecanaRateServices = require("../../services/readyRecanaRate.service");

const { getReadyRecanaRateByIdValidationSchema } = require("../../utils/validation/tax-rate.validation");

const getReadyRecanaRateById = async (request, response) => {
    try {
        const { id } = request.params;

        // Validate the ID
        await getReadyRecanaRateByIdValidationSchema.validate({ id });

        // Fetch Tax Rate from DB
        const ReadyRecanaRate = await readyRecanaRateServices.getReadyRecanaRateId(id);
        if (taxRate) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "ReadyRecanaRate not found",
                data: taxRate,
            });

        } else {
            return response.status(404).json({
                status: "FAILED",
                message: "ReadyRecanaRate not found",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getReadyRecanaRateById;