const bcrypt = require('bcryptjs');

const User = require('../models/User');

/*
 * Creates a user if the email is not already registered.
 *  It then returns the user created.
*/
const createUser = async (name, email, password) => {
    if (await getUserByEmail(email)) {
        throw { errorCode: 400, message: "User already exists" };
    }

    const user = new User({ name, email, password });
    user.password = await generateSaltedPassword(password);

    return await user.save();
};

/*
 * Gets a user by its email.
*/
const getUserByEmail = async (email) => await User.findOne({ email });

/*
 * Gets a user by its id.
*/
const getUserById = async (id) => await User.findById(id);

/*
 * Generate a salt and then hash the password with that particular salt.
 *  Retuns the saltedPassword.
*/
const generateSaltedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = { createUser, getUserByEmail, getUserById };
