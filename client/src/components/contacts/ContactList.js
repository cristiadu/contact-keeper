import React, { useContext } from 'react'

import ContactContext from '../../context/contacts/ContactContext'

import ContactItem from './ContactItem'

const ContactList = () => {
  const contactContext = useContext(ContactContext)

  const { contacts } = contactContext

  return (
    <>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  )
}

export default ContactList
