const namuna8AServices = require("../../services/namuna8A.service");
const userServices = require("../../services/user.service");

const getNamuna8AList = async (request, response) => {
    try {
        const { id, isAdmin } = request;

        //extract data from request body
        const { page, searchString } = request.body;
        //get data from db & send response to client
        const result = await namuna8AServices.getNamunaList(isAdmin, id, page, searchString);
        if (result?.totalPages) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Namuna list fetch successfully",
                ...result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Namuna 8A not available",
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

module.exports = getNamuna8AList;