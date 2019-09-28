const express = require('express');
const router = express.Router();

/*
 * @route        GET  /api/contacts
 * @description  Gets all user's contacts.
 * @access       Authemticated User
*/
router.get('/', (req, res) => {
    res.send('Get all contacts from user.');
});

/*
 * @route        POST  /api/contacts
 * @description  Add a new contact for the authenticated user.
 * @access       Authemticated User
*/
router.post('/', (req, res) => {
    res.send('Add contact for user');
});

/*
 * @route        PUT  /api/contacts/:id
 * @description  Update a contact of the authenticated user.
 * @access       Authemticated User
*/
router.put('/:id', (req, res) => {
    res.send('Add contact for user');
});

/*
 * @route        DELETE  /api/contacts/:id
 * @description  Delete a contact of the authenticated user.
 * @access       Authemticated User
*/
router.delete('/:id', (req, res) => {
    res.send('Add contact for user');
});

module.exports = router;