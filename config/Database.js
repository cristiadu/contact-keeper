const config = require('config');
const mongoose = require('mongoose');

const db = config.get('mongoURI');

const connectDB = (callBack) => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => connectionEstablished(callBack))
    .catch((err) => handleDbConnectionError(err));
};

const connectionEstablished = (callBack) => {
    console.log("Connection with MongoDB established.");

    // Setting up listener for further connection errors.
    mongoose.connection.on('error', err => {
        handleDbConnectionError(err);
      });

    callBack();
};

const handleDbConnectionError = (error) => {
    console.error(`MongoDB Error: ${error}`);
    process.exit(1);
};

module.exports = connectDB;