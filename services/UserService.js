const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async (name, email, password) => {
    if (await getUser(email)) {
        throw { errorCode: 400, message: "User already exists" };
    }

    const user = new User({ name, email, password });
    user.password = await generateSaltedPassword(password);

    return await user.save();
};

const getUser = async (email) => await User.findOne({ email });

const generateSaltedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = { createUser, getUser };
