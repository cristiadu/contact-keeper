import React, { useReducer } from 'react';
import uuid from 'uuid';

import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../ContextTypes';

const ContactState = (props) => {
    const initialState = {
        contacts: [{
            id: 1,
            name: 'Bob Borguette',
            email: 'bob@bob.com',
            phone: '1661-11-111',
            type: 'personal'
        },{
            id: 2,
            name: 'Bobba Borguette',
            email: 'bobba@bob.com',
            phone: '1111-11-842',
            type: 'professional'
        },{
            id: 3,
            name: 'Bobdeb Borguette',
            email: 'bobbbaaabb@bob.com',
            phone: '1141-11-111',
            type: 'personal'
        },{
            id: 4,
            name: 'Bobewew Dick',
            email: 'bob@bsob.com',
            phone: '11211-11-111',
            type: 'personal'
        }],
        current: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

    // Update Contact
    const updateContact = (contact) => dispatch({ type: UPDATE_CONTACT, payload: contact });

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact
        }}>
            { props.children }
        </ContactContext.Provider>
    );
};

export default ContactState;