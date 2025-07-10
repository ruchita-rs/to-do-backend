const namuna8AServices = require("../../services/namuna8A.service");
const { userIdsValidationSchema } = require("../../utils/validation/user.validation");
const mongoose = require("mongoose");

const deleteNamuna8A = async (request, response) => {
    try {
        const { userIds } = request.body;

        // Validate input
        try {
            await userIdsValidationSchema.validate({ userIds }, { abortEarly: true });
        } catch (validationError) {
            return response.status(400).json({
                status: "FAILED",
                message: validationError?.errors?.[0] || "Validation error"
            });
        }

        // Validate and confirm each ID exists
        const deletedUsers = [];

        for (const id of userIds) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response.status(400).json({
                    status: "FAILED",
                    message: `Invalid ObjectId: ${id}`
                });
            }

            const record = await namuna8AServices.getUserByObjId(id);
            if (!record) {
                return response.status(404).json({
                    status: "FAILED",
                    message: `Record with ID ${id} not found.`
                });
            }

            deletedUsers.push(record.propertyNo || id);
        }

        // Delete all valid IDs
        const result = await namuna8AServices.deleteSelectedUsers(userIds);
        if (result?.acknowledged && result?.deletedCount > 0) {
            return response.status(200).json({
                status: 'SUCCESS',
                message: 'Records deleted successfully.',
                deletedUsers
            });
        } else {
            return response.status(500).json({
                status: 'FAILED',
                message: 'Failed to delete records.'
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: 'FAILED',
            message: error.message
        });
    }
};

module.exports = deleteNamuna8A;
