const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');

const User = require('../models/User');

/*
 * @route        POST  /api/users
 * @description  Registers a user.
 * @access       Public
*/
router.post('/', [
    check('name', 'Please include a name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with a length between 6 and 32')
        .isLength({ min: 6, max: 32 })
], (req, res) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    return res.send("ok!");
});

module.exports = router;