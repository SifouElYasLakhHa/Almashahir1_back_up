const express = require('express');

const router = express.Router();

const {
    createInvoice,
    checkTransactionsExist,
    updateTransactionsApi,
    updateTransactionsDetailsApi,
    updateTransactionsDetailsSuccessApi
} = require('../../../controllers/all/api/stripe.controller');

const {
  authLogin,
} = require('../../../utils/auth');

router.post('/stripe/invoice/create', authLogin, createInvoice);
router.post('/stripe/transaction/checker/:transactionId', checkTransactionsExist);
router.put('/stripe/transaction/update/:transactionId', updateTransactionsApi);
router.put('/stripe/transaction/update/details/:transactionId', updateTransactionsDetailsApi);
router.post('/stripe/transaction/success/:transactionId', updateTransactionsDetailsSuccessApi);

module.exports = router;
