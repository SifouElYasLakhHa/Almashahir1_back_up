const express = require('express');

const router = express.Router();
const {
    ordersPage,
    ordersPageSpecial,
    ordersPageSpecialTwo,
} = require('../../../controllers/all/pages/orders.controller');
const {
  authLogin,
} = require('../../../utils/auth');

router.get('/orders', authLogin, ordersPage);
router.get('/orders/:orderType', authLogin, ordersPageSpecial);
router.get('/orders/:orderType/:orderCount', authLogin, ordersPageSpecialTwo);

module.exports = router;
