module.exports.responseFromApiError = (res, error, fileName, method) => {
    if (error.errorCode && error.message) {
        return res.status(error.errorCode).json({ error: error.message });
    }

    console.error(`Received Error: "${error}" while calling ${method} from ${fileName}`);
    return res.status(500).json({ error: "Server Error" });
};