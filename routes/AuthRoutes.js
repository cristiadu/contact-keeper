const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
    res.send('Logging in user');
});

module.exports = router;