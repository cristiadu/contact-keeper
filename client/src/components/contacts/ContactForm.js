import React, { useState, useContext, useEffect } from 'react';

import ContactContext from '../../context/contacts/ContactContext';

const initialContactState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal'
};

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { current } = contactContext;

    const [contact, setContact] = useState(initialContactState);
    const { name, email, phone, type } = contact;
    const currentAction = current ? 'Edit Contact': 'Add Contact';


    // Updates the value of contact if the "current" ContactState object is set.
    // This is used for editing contacts using the same form.
    useEffect(
        () => setContact(current !== null ? current : initialContactState),
        [contactContext, current]
    );

    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const clearForm = () => contactContext.clearCurrent();

    const onSubmit = (e) => {
        e.preventDefault();

        if(current === null) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact);
        }

        clearForm();
    }

    return (
        <form onSubmit={onSubmit} >
            <h2 className="text-primary">
                {currentAction}
            </h2>
            <input type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input type="text"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input type="radio" 
                name="type" 
                value="personal" 
                onChange={onChange}
                checked={ type === 'personal' } /> Personal&nbsp;

            <input type="radio" 
                name="type" 
                value="professional" 
                onChange={onChange}
                checked={ type === 'professional' } /> Professional
            <div>
                <input type="submit" value={currentAction} className="btn btn-primary btn-block" />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearForm}>Clear</button>
            </div>}
        </form>
    );
};

export default ContactForm;
