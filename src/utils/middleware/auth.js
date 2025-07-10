const jwt = require('jsonwebtoken');
const userServices = require('../../services/user.service');

const authenticateUserJWT = async (request, response, next) => {
    try {
        const authHeader = request.header('authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userObject) => {
                if (err) {
                    response.status(200).json({
                        status: "JWT_INVALID",
                        message: "Your session has ended. Please login again."
                    });
                    return;
                } else {
                    request.userId = userObject.userId;

                    // check if user exists
                    const doesUserExist = await userServices.getUserByUserId(userObject.userId)
                    if (!doesUserExist) {
                        response.status(200).json({
                            status: "JWT_INVALID",
                            message: "Your session has ended. Please login again."
                        });
                        return;
                    }
                    request.mobile = doesUserExist.mobile;
                    request.id = doesUserExist._id;
                    request.name = doesUserExist.name;
                    request.isActive = doesUserExist?.isActive;
                    request.isAdmin = doesUserExist?.isAdmin;
                }
                next();
            });
        } else {
            response.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message
        });
        return;
    }
};

module.exports = authenticateUserJWT;