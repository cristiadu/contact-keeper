const bcrypt = require('bcryptjs')
const User = require('../models/User')

/*
 * Gets a user by its email.
*/
const getUserByEmail = async (email) => User.findOne({ email })

/*
 * Generate a salt and then hash the password with that particular salt.
 *  Retuns the saltedPassword.
*/
const generateSaltedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/*
 * Creates a user if the email is not already registered.
 *  It then returns the user created.
*/
const createUser = async (name, email, password) => {
  /* eslint-disable no-throw-literal */
  if (await getUserByEmail(email)) {
    throw { errorCode: 400, message: 'User already exists' }
  }
  /* eslint-enable no-throw-literal */

  const user = new User({ name, email, password })
  user.password = await generateSaltedPassword(password)

  return user.save()
}

/*
 * Gets a user by its id.
*/
const getUserById = async (id) => User.findById(id)

module.exports = { createUser, getUserByEmail, getUserById }
