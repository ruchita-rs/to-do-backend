
const taxRateServices = require("../../services/tax-rate.service");

const getTaxRate = async (request, response) => {
    try {

        //extract data from request body
        const { page, searchString } = request.body;
        //get data from db & send response to client
        const result = await taxRateServices.getTaxRateList(page, searchString);
        if (result?.totalPages) {
            response.status(200).json({
                status: "SUCCESS",
                message: "TaxRate fetch successfully",
                ...result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "TaxRate not available",
            });
            return;
        }

    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
        return;
    }
};

module.exports = getTaxRate;