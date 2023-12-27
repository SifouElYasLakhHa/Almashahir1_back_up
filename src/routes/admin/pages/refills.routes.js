const express = require("express");

const router = express.Router();
const {
    refillsPage,
    refillsPageSpecial,
} = require("../../../controllers/admin/pages/refills.controller");
const { 
  authLogin,
  isAdmin,
 } = require("../../../utils/auth");

router.get("/admin/refills", authLogin, isAdmin,refillsPage);
router.get("/admin/refills/:refillsType", authLogin, isAdmin,refillsPageSpecial);

module.exports = router;
