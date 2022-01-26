const { validationResult } = require('express-validator')

const VALIDATION_ERROR = { errorCode: 400, message: 'Error while validating request' }
const INTERNAL_ERROR = { errorCode: 500, message: 'Internal Server Error' }

const responseFromApiError = (res, error, fileName, method) => {
  if (error.errorCode && error.message) {
    return res.status(error.errorCode).json(error)
  }

  console.error(`Received Error: "${error}" while calling ${method} from ${fileName}`)
  return res.status(INTERNAL_ERROR.errorCode).json(INTERNAL_ERROR)
}

/* eslint-disable no-throw-literal */
const validateRequest = (req) => {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) throw { errors: validationErrors.array(), ...VALIDATION_ERROR }
}
/* eslint-enable no-throw-literal */

module.exports = { responseFromApiError, validateRequest }
