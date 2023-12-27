const express = require("express");

const router = express.Router();
const {
    createRefill,
} = require("../../../controllers/all/api/refills.controller");
const { 
  authLogin,
} = require("../../../utils/auth");

router.post("/refill/add/:orderId", authLogin, createRefill);

module.exports = router;
