const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const errorHandler = require('../config/ErrorHandler');

const { checkJwtAuth } = require('../services/AuthService');
const contactService = require('../services/ContactService');

const DELETED_CONTACT_RESPONSE = { code: 200, message: "Contact is now removed." };

/*
 * @route        GET  /api/contacts
 * @description  Gets all user's contacts.
 * @access       Authemticated User
*/
router.get('/', checkJwtAuth, async (req, res) => {
    try {
        const contacts = await contactService.getUserContacts(req.user.id);
        return res.status(200).json(contacts);
    } catch (error) {
        errorHandler.responseFromApiError(res, error, 'contactService', 'getUserContacts');
    }
});

/*
 * @route        POST  /api/contacts
 * @description  Add a new contact for the authenticated user.
 * @access       Authemticated User
*/
router.post('/', [checkJwtAuth, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email should be valid').optional().isEmail()
]], async (req, res) => {
    try {
        errorHandler.validateRequest(req);

        const { name, email, phone, type } = req.body;
        const newContact = await contactService.createContact(req.user.id, name, email, phone, type);
        return res.status(200).json(newContact);
    } catch (error) {
        errorHandler.responseFromApiError(res, error, 'contactService', 'createContact');
    }
});

/*
 * @route        PUT  /api/contacts/:id
 * @description  Update a contact of the authenticated user.
 * @access       Authemticated User
*/
router.put('/:id', [checkJwtAuth, [
    check('email', 'Email should be valid').optional().isEmail()
]], async (req, res) => {
    try {
        errorHandler.validateRequest(req);

        const { name, email, phone, type } = req.body;
        const updatedContact = await contactService.updateContact(req.user.id, req.params.id, name, email, phone, type);
        return res.status(200).json(updatedContact);
    } catch (error) {
        errorHandler.responseFromApiError(res, error, 'contactService', 'updateContact'); 
    }
});

/*
 * @route        DELETE  /api/contacts/:id
 * @description  Delete a contact of the authenticated user.
 * @access       Authemticated User
*/
router.delete('/:id', checkJwtAuth, async (req, res) => {
    try {
        await contactService.deleteContact(req.user.id, req.params.id);
        return res.status(DELETED_CONTACT_RESPONSE.code).json(DELETED_CONTACT_RESPONSE);
    } catch (error) {
        errorHandler.responseFromApiError(res, error, 'contactService', 'deleteContact');
    }
});

module.exports = router;