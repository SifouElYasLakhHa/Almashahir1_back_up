const express = require("express");

const router = express.Router();
const {
    viewsPayment,
} = require("../../../controllers/all/api/paymentsMethods.controller");
const {
  authLogin,
} = require('../../../utils/auth');

router.get("/payments/views", authLogin, viewsPayment);

module.exports = router;
