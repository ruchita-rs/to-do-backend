const toDoListServices = require("../../services/toDoList.services");
const { gettoDoListByIdValidationSchema } = require("../../utils/validation/toDoList.validation");


const gettoDoListById = async (request, response) => {
    try {
        const { id } = request.body;
        console.log("id : ",id)

        // Validate the ID
        await gettoDoListByIdValidationSchema.validate({ id });

        // Fetch toDoList from DB
        const toDo = await toDoListServices.gettoDoListId(id);
        console.log("toDo : ",toDo)
        if (toDo) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "toDoList is fetch successfully",
                data: toDo,
            });

        } else {
            return response.status(404).json({
                status: "FAILED",
                message: "toDoList not found",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = gettoDoListById;
