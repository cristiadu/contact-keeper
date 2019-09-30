const { validationResult } = require('express-validator');

const VALIDATION_ERROR = { errorCode: 400, message: "Error while validating request"};

const responseFromApiError = (res, error, fileName, method) => {
    if (error.errorCode && error.message) {
        return res.status(error.errorCode).json(error);
    }

    console.error(`Received Error: "${error}" while calling ${method} from ${fileName}`);
    return res.status(500).json({ error: "Server Error" });
};

const validateRequest = (req) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) throw { errors: validationErrors.array(), ...VALIDATION_ERROR };
};

module.exports = { responseFromApiError, validateRequest };