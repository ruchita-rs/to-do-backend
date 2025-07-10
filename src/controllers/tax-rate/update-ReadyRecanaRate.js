const { updateReadyRecanaRateValidationSchema } = require("../../utils/validation/tax-rate.validation");
const ReadyRecanaRateServices = require("../../services/readyRecanaRate.service");
const readyRecanaRateServices = require("../../services/readyRecanaRate.service");

const updateReadyRecanaRate = async (request, response) => {
    try {
        // Extract data from request body
        const { id, description, rate } = request.body;
        //check validation
        const validationResult = await updateReadyRecanaRateValidationSchema.validate({ id, description, rate }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        // Check if the description already exists for a different record
        const existingTaxRate = await readyRecanaRateServices.getReadyRecanaRateDescription(description);

        if (existingTaxRate && existingTaxRate.id !== id) {
            return response.status(200).json({
                status: "FAILED",
                message: "Tax Rate for the given description already exists. Please use a different description.",
            });
        }
        // Perform update
        const result = await ReadyRecanaRateServices.updateReadyRecanaRate(id, {
            description,
            rate,
        });

        if (result?.matchedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "ReadyRecanaRate updated successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No matching ReadyRecanaRate found or no changes made",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateReadyRecanaRate;