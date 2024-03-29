const Contact = require('../models/Contact')

const CONTACT_NOT_FOUND_ERROR = { errorCode: 404, message: 'Contact does not exist or is from another user' }

/*
 * Get all contacts of a particular user.
 *  sorting options can be provided, but the default is DESC order.
*/
const getUserContacts = async (userId, sortOptions = { date: -1 }) => Contact
  .find({ user: userId })
  .sort(sortOptions)

/*
 * Create a new contact for a particular user.
*/
const createContact = async (userId, name, email, phone, type) => {
  const contact = new Contact({
    name, email, phone, type, user: userId,
  })
  return contact.save()
}

/*
 * Gets a contact from a particular user.
*/
const getContact = async (userId, contactId) => Contact.findOne({ user: userId, _id: contactId })

/*
 * Updates a contact for a particular user.
*/
const updateContact = async (userId, contactId, name, email, phone, type) => {
  const contact = getContact(userId, contactId)

  if (!contact) throw CONTACT_NOT_FOUND_ERROR

  // The "magic" below sets only non-null values into the contactFields object.
  const contactFields = {
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(type && { type }),
  }

  return Contact.findByIdAndUpdate(contactId, { $set: contactFields }, { new: true })
}

/*
 * Deletes a contact of a particular user.
*/
const deleteContact = async (userId, contactId) => Contact.findOneAndRemove({ _id: contactId, user: userId })

module.exports = {
  getUserContacts, createContact, updateContact, deleteContact,
}
