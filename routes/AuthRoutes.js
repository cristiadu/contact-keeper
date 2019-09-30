const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const errorHandler = require('../config/ErrorHandler');

const authService = require('../services/AuthService');


/*
 * @route        GET  /api/auth
 * @description  Gets logged in user.
 * @access       Authenticated Users
*/
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

/*
 * @route        POST  /api/auth
 * @description  Authenticates user and return jwt token.
 * @access       Public
*/
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    try {
        errorHandler.validateRequest(req);

        const { email, password } = req.body;

        const user = await authService.verifyCredentialsAndReturnUser(email, password);
        const jwtToken = authService.generateJwtToken(user);
        return res.status(200).json({ token: jwtToken });
    } catch (error) {
        errorHandler.responseFromApiError(res, error, "authService", "/api/auth POST");
    }
});

module.exports = router;