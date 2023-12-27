const express = require("express");

const router = express.Router();
const {
    refillsPage,
    refillsPageSpecial,
} = require("../../../controllers/all/pages/refills.controller");
const { 
  authLogin,
 } = require("../../../utils/auth");

router.get("/refills", authLogin, refillsPage);
router.get("/refills/:refillsType", authLogin, refillsPageSpecial);

module.exports = router;
