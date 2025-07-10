const { createUserValidationSchema } = require("../../utils/validation/user.validation");
const userServices = require("../../services/user.service");

const createUser = async (request, response) => {
    try {
        //extract data from request body
        const { name, email, mobile, password, } = request.body;

        //check validation
        const validationResult = await createUserValidationSchema.validate({ name, email, mobile: mobile?.toString(), password }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        //check user already exist with mobile no
        const isUserExist = await userServices.getUserByMobile(mobile)
        if (isUserExist) {
            response.status(200).json({
                status: "FAILED",
                message: "User already exist with this mobile",
            });
            return;
        }



        let userId;
        //get last generated user
        const users = await userServices.getLatestCreatedRecord();
        //generate user id
        if (users.length > 0) {
            const lastUserUserId = (Number(users[0].userId.substring(3)) + 1)
            userId = `DGS${lastUserUserId}`
        } else {
            userId = "DGS1000"
        }


        const dataToInsert = {
            name: name?.toLowerCase(),
            email,
            mobile: mobile?.toString(),
            password,
            userId,
            isActive: true,
            isDeleted: false,
            isAdmin: false
        }

        //insert data into db & send response to client
        const result = await userServices.createUser(dataToInsert);
        if (result._id) {
            response.status(200).json({
                status: "SUCCESS",
                message: "User created successfully",
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to create user, Please try again!",
            });
            return;
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createUser;