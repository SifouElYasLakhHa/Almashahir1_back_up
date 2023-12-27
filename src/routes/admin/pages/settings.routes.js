const express = require("express");

const router = express.Router();
const {
  viewsSettings,
} = require("../../../controllers/admin/pages/settings.controller");

const { 
    authLogin, isAdmin, 
 } = require("../../../utils/auth");

router.get("/admin/settings", authLogin, isAdmin,  viewsSettings);

module.exports = router;
