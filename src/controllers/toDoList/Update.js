
const toDoListServices = require("../../services/toDoList.services");
const { updatetoDoListValidationSchema } = require("../../utils/validation/toDoList.validation");

const updatetoDoList = async (request, response) => {
    try {
        console.log("🔍 Received body:", request.body);     
        // Extract data from request body
        const { id, title, description, priority, category, duedate, time,  } = request.body;
        //check validation
        const validationResult = await updatetoDoListValidationSchema.validate({ id, title, description, priority, category, duedate, time,  }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        // Check if the description already exists for a different record

        // Perform update
        const result = await toDoListServices.updatetoDoList(id, {
            title,
            description,
            priority,
            category,
            duedate,
            time
            
        });

        if (result?.matchedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "toDoList updated successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No matching toDoList found or no changes made",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updatetoDoList;