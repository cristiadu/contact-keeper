const express = require('express')

const router = express.Router()
const { check } = require('express-validator')

const errorHandler = require('../config/ErrorHandler')

const userService = require('../services/UserService')

/*
 * @route        POST  /api/users
 * @description  Registers a user.
 * @access       Public
*/
router.post('/', [
  check('name', 'Please include a name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with a length between 6 and 32').isLength({ min: 6, max: 32 }),
], async (req, res) => {
  try {
    errorHandler.validateRequest(req)
    const { name, email, password } = req.body

    const createUser = await userService.createUser(name, email, password)
    return res.status(200).json(createUser)
  } catch (error) {
    return errorHandler.responseFromApiError(res, error, 'userService', 'createUser')
  }
})

module.exports = router
