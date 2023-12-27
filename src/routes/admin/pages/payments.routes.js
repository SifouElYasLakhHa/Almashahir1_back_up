const express = require('express');

const router = express.Router();

const {
  managePaymentsPage,
  managePaymentsPageSpecial,
} = require('../../../controllers/admin/pages/payments.controller');

const {
  authLogin, isAdmin,
} = require('../../../utils/auth');

router.get('/admin/payments', authLogin, isAdmin, managePaymentsPage);
router.get('/admin/payments/:transactionsCount', authLogin, isAdmin, managePaymentsPageSpecial);

module.exports = router;