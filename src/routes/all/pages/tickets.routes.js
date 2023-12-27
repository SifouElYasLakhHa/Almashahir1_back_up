const express = require('express');

const router = express.Router();
const { 
   ticketsPage,
   viewticketPage,
 } = require('../../../controllers/all/pages/tickets.controller');
 const { 
    mexAuthLogin,
    authLogin,
 } = require('../../../utils/auth');

router.get('/tickets', authLogin, ticketsPage);
router.get('/ticket/:ticketId', authLogin, viewticketPage);

module.exports = router;