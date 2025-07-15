const toDoListServices = require("../../services/toDoList.services");
const { deletetoDoListValidationSchema } = require("../../utils/validation/toDoList.validation");


const deletetoDoList = async (request, response) => {
    try {
        const { id } = request.body;

        // Validate ID using Joi (synchronous)
        const { error } = deletetoDoListValidationSchema.validate({ id });
        if (error) {
            return response.status(200).json({
                status: "FAILED",
                message: error.details[0].message,
            });
        }

        // Check if tax rate exists
        const existingtoDoList = await toDoListServices.gettoDoListId(id);
        if (!existingtoDoList) {
            return response.status(404).json({
                status: "FAILED",
                message: "toDoList not found",
            });
        }

        // Proceed to delete
        const result = await toDoListServices.deletetoDoList(id);
        console.log(result);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "toDoList deleted successfully",
            });
        } else {
            return response.status(500).json({
                status: "FAILED",
                message: "Failed to delete toDoList",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deletetoDoList;