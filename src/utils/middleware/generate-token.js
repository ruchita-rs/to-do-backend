const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;


module.exports = function generateUserJWT(userId, name, email, mobile, id) {
    return jwt.sign({ userId, name, email, mobile, id }, secretKey, { expiresIn: process.env.JWT_EXPIRE_TIME });
}