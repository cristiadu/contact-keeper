const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async (name, email, password) => {
    if (await getUserByEmail(email)) {
        throw { errorCode: 400, message: "User already exists" };
    }

    const user = new User({ name, email, password });
    user.password = await generateSaltedPassword(password);

    return await user.save();
};

const getUserByEmail = async (email) => await User.findOne({ email });

const getUserById = async (id) => await User.findById(id);

const generateSaltedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = { createUser, getUserByEmail, getUserById };
