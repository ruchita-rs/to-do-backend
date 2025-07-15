const toDoListServices = require("../../services/toDoList.services");
const { checktoDoListValidationSchema } = require("../../utils/validation/toDoList.validation");


const createTodoList = async (request, response) => {
    try {
        //extract data from request body
        const { title, description, priority, category, duedate, time } = request.body;

        //check validation
        const validationResult = await checktoDoListValidationSchema.validate({ title, description, priority, category, duedate, time }, { abortEarly: true });

        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }




        //insert data into db & send response to client
        const now = new Date().toISOString();
        const result = await toDoListServices.createTodoList({
            title,
            description,
            priority,
            category,
            duedate,
            time,
            createdAt: now,
            updatedAt: now,
        });

        if (result && result._id) {
            response.status(200).json(result); 
        } else {
            response.status(400).json({
                status: "FAILED",
                message: "Failed to create to-do list. Please try again!",
            });
        }


    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createTodoList;