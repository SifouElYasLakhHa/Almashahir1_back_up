const express = require('express');

const router = express.Router();

const {
    createTicket,
    createMessageTicket,
    viewsTicketMessage,
} = require('../../../controllers/all/api/tickets.controller');

const {
  authLogin,
} = require('../../../utils/auth');

router.post('/ticket/add', authLogin, createTicket);
router.post('/ticket/message/:ticketId/add', authLogin, createMessageTicket);
router.get('/ticket/views/:ticketId', authLogin, viewsTicketMessage);

module.exports = router;