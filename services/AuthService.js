const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userService = require('./UserService')

const errorHandler = require('../config/ErrorHandler')

const jwtSecret = config.get('jwtSecret')
const MISSING_TOKEN_ERROR = { errorCode: 401, message: 'Authentication token missing' }
const INVALID_TOKEN_ERROR = { errorCode: 401, message: 'Invalid authentication token' }
const INVALID_CREDENTIALS_ERROR = { errorCode: 400, message: 'Invalid credentials' }

/*
 * Method that verifies that a particular email is from
 *   a validUser and that the password matches.
 *
 *  It also returns the user retrieved by the email provided.
*/
const verifyCredentialsAndReturnUser = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if (!user) throw INVALID_CREDENTIALS_ERROR

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) throw INVALID_CREDENTIALS_ERROR

  return user
}

/*
 * Creates a jwtToken with the userId and signed by our jwtSecret.
 *  It then returns the jwt created.
*/
const generateJwtToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  }

  return jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
}

/*
 * Verifies that a particular token is a valid jwtToken
 *  and that it's signed by our jwtSecret.
 *
 * If it's not valid, throws an exception
 *  for the errorHandler to treat as a HTTP response later.
*/
const verifyJwt = (token) => {
  try {
    return jwt.verify(token, jwtSecret)
  } catch (error) {
    throw INVALID_TOKEN_ERROR
  }
}

/*
 * Handler method used as an authentication filter.
 *  It is applied to all routes that need authentication,
 *  and it checks for the jwtToken signed by our jwtSecret.
 *
 *  It also adds to the request the user information
 *   extracted from the jwtToken provided.
*/
const checkJwtAuth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) throw MISSING_TOKEN_ERROR

    const jwtDecoded = verifyJwt(token)

    req.user = jwtDecoded.user
    next()
  } catch (error) {
    errorHandler.responseFromApiError(res, error, 'authService', 'checkJwtAuth')
  }
}

module.exports = { verifyCredentialsAndReturnUser, generateJwtToken, checkJwtAuth }
