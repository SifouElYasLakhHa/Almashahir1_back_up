const express = require("express");

const router = express.Router();
const {
  createPayment,
} = require("../../../controllers/admin/api/paymentsMethods.controller");
const {
  authLogin,
  isAdmin, 
} = require('../../../utils/auth');

router.post("/admin/payment/add", authLogin, isAdmin, createPayment);

module.exports = router;
