const express = require('express');

const router = express.Router();
const {
    addFundsPage,
    addFundsPageSpecial,
} = require('../../../controllers/all/pages/funds.controller');
const {
  authLogin,
} = require('../../../utils/auth');

router.get('/addfunds', authLogin, addFundsPage);
router.get('/addfunds/:transactionId', authLogin, addFundsPageSpecial);

module.exports = router;
