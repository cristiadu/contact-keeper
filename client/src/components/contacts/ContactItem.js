import React from 'react';
import PropTypes from 'prop-types';

import './ContactItem.css'

const ContactItem = ({ contact }) => {
    const { name, email, phone, type } = contact;
    const badgeClass = type === 'professional' ? 'badge-success' : 'badge-primary';

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
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
                <button className="btn btn-dark btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </div>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;
