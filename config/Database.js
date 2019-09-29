const config = require('config');
const mongoose = require('mongoose');

const db = config.get('mongoURI');

const connectDB = async () => {
    return mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => connectionEstablished())
    .catch((err) => handleDbConnectionError(err));
};

const connectionEstablished = () => {
    console.log("Connection with MongoDB established.");

    // Setting up listener for further connection errors.
    mongoose.connection.on('error', err => {
        handleDbConnectionError(err);
      });
};

const handleDbConnectionError = (error) => {
    console.error(`MongoDB Error: ${error}`);
    process.exit(1);
};

module.exports = connectDB;