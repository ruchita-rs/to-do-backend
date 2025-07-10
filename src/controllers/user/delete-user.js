const userServices = require("../../services/user.service");
const { userIdsValidationSchema } = require("../../utils/validation/user.validation");

const deleteSelectedUser = async (request, response) => {
    try {
        const userIds = request.body.userIds;

        try {
            await userIdsValidationSchema.validate({ userIds }, { abortEarly: true });
        } catch (validationError) {
            return response.status(400).json({
                status: "FAILED",
                message: validationError?.errors?.[0] || "Validation error"
            });
        }

        const userNames = [];
        for (let i = 0; i < userIds.length; i++) {
            const user = userIds[i];
            const isUserExist = await userServices.getUserByObjId(user);
            if (!isUserExist) {
                return response.status(404).json({
                    status: 'FAILED',
                    message: `User with ID ${user} does not exist.`
                });
            }
            userNames.push(isUserExist.name);
        }

        const result = await userServices.deleteSelectedUsers(userIds);
        if (result?.acknowledged && result?.deletedCount > 0) {
            const dataToSend = {
                action: "Delete",
                actionIn: "User Model",
                title: "User Deleted",
                description: `${request.name} deleted user(s): ${userNames.join(", ")}`,
                actionBy: request.id
            };

            return response.status(200).json({
                status: 'SUCCESS',
                message: 'Users deleted successfully.',
                deletedUsers: userNames
            });
        } else {
            return response.status(500).json({
                status: 'FAILED',
                message: 'Failed to delete users.'
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: 'FAILED',
            message: error.message
        });
    }
};

module.exports = deleteSelectedUser;
