const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('./UserService');

const jwtSecret = config.get('jwtSecret');
const INVALID_CREDENTIALS_ERROR = { errorCode: 400, message: "Invalid credentials" };

const verifyCredentialsAndReturnUser = async (email, password) => {
    let user = await userService.getUser(email);
    if(!user) throw INVALID_CREDENTIALS_ERROR;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) throw INVALID_CREDENTIALS_ERROR;

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

module.exports = { verifyCredentialsAndReturnUser, generateJwtToken };