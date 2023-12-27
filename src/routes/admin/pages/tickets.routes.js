const express = require('express');

const router = express.Router();

const {
    manageTicketsPage,
} = require('../../../controllers/admin/pages/tickets.controller');

const {
    authLogin, isAdmin, 
} = require('../../../utils/auth');

router.get('/admin/tickets', authLogin, isAdmin,  manageTicketsPage);
module.exports = router;