const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('./UserService');

const errorHandler = require('../config/ErrorHandler');

const jwtSecret = config.get('jwtSecret');
const MISSING_TOKEN_ERROR = { errorCode: 401, message: "Authentication token missing" };
const INVALID_TOKEN_ERROR = { errorCode: 401, message: "Invalid authentication token" };
const INVALID_CREDENTIALS_ERROR = { errorCode: 400, message: "Invalid credentials" };

const verifyCredentialsAndReturnUser = async (email, password) => {
    let user = await userService.getUserByEmail(email);
    if (!user) throw INVALID_CREDENTIALS_ERROR;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw INVALID_CREDENTIALS_ERROR;

    return user;
};

const generateJwtToken = (user) => {
    const payload = {
        user: {
            id: user.id
        }
    }

    return jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
};

const checkJwtAuth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) throw MISSING_TOKEN_ERROR;

        const jwtDecoded = verifyJwt(token);

        req.user = jwtDecoded.user;
        next();
    } catch (error) {
        errorHandler.responseFromApiError(res, error, "authService", "checkJwtAuth");
    }
};

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw INVALID_TOKEN_ERROR;
    }
}

module.exports = { verifyCredentialsAndReturnUser, generateJwtToken, checkJwtAuth };