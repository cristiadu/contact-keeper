import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ContactContext from '../../context/contacts/ContactContext'

import './ContactItem.css'

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext)

  const {
    id, name, email, phone, type,
  } = contact
  const badgeClass = type === 'professional' ? 'badge-success' : 'badge-primary'

  const onDeleteClick = () => {
    contactContext.deleteContact(id)
    contactContext.clearCurrent()
  }

  return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
                <span className={`badge right ${badgeClass}`}>{type.toUpperCase()}</span>
            </h3>
            <ul className="list">
                {email && (
                    <li><i className="fas fa-envelope-open"/> {email}</li>
                )}

                {phone && (
                    <li><i className="fas fa-phone"/> {phone}</li>
                )}
            </ul>
            <div>
                <button className="btn btn-dark btn-sm" onClick={() => contactContext.setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDeleteClick}>Delete</button>
            </div>
        </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
