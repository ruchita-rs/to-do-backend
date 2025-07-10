
const readyRecanaRateServices = require("../../services/readyRecanaRate.service");

const getReadyRecanaRate = async (request, response) => {
    try {

        //extract data from request body
        const { page, searchString } = request.body;
        //get data from db & send response to client
        const result = await readyRecanaRateServices.getReadyRecanaRateList(page, searchString);
        if (result?.totalPages) {
            response.status(200).json({
                status: "SUCCESS",
                message: "ReadyRecanaRate fetch successfully",
                ...result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "ReadyRecanaRate not available",
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

module.exports = getReadyRecanaRate;