const express = require("express");

const router = express.Router();
const {
    providersPage,
} = require("../../../controllers/admin/pages/providers.controller");
const { 
  authLogin,
  isAdmin,
 } = require("../../../utils/auth");

router.get("/admin/providers", authLogin, isAdmin,providersPage);

module.exports = router;
