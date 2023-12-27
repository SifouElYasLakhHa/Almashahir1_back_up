const express = require('express');

const router = express.Router();
const {
    createOrder,
    createNewOrder,
} = require('../../../controllers/all/api/orders.controller');
const { 
    authLogin,
   } = require("../../../utils/auth");

router.post('/order/add', authLogin, createOrder);
router.post('/order/add/test', authLogin, createNewOrder);

module.exports = router;
