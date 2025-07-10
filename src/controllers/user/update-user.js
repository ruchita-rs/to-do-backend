const { updateUserValidationSchema } = require("../../utils/validation/user.validation");
const userServices = require("../../services/user.service");

const updateUser = async (request, response) => {
    try {
        const { userId, name, email, mobile, password } = request.body;

        // Validate input
        try {
            await updateUserValidationSchema.validate(
                { userId, name, email, mobile: mobile?.toString(), password },
                { abortEarly: true }
            );
        } catch (validationError) {
            return response.status(400).json({
                status: "FAILED",
                message: validationError.message,
            });
        }


        // Check if user exists
        const existingUser = await userServices.getUserByObjId(userId);
        if (!existingUser) {
            return response.status(200).json({
                status: "FAILED",
                message: "User not found",
            });
        }

        // Optional: check if new mobile conflicts with another user's mobile
        const userWithSameMobile = await userServices.getExistingUserByMobileNo(userId, mobile);
        if (userWithSameMobile) {
            return response.status(200).json({
                status: "FAILED",
                message: "Another user already exists with this mobile",
            });
        }


        // Build update payload
        const dataToUpdate = {
            name,
            mobile,
            email,
            password
        };

        // Update user in database
        const updateResult = await userServices.updateUserByUserId(userId, dataToUpdate);

        if (updateResult.modifiedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User updated successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No changes made or update failed",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateUser;
