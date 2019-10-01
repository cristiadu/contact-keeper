const Contact = require('../models/Contact');

/*
 * Get all contacts of a particular user.
 *  sorting options can be provided, but the default is DESC order.
*/
const getUserContacts = async (userId, sortOptions = {date: -1 }) => await Contact
    .find({ user: userId })
    .sort(sortOptions);

module.exports = { getUserContacts };