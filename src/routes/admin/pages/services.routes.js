const express = require("express");

const router = express.Router();
const {
  manageServicePage,
} = require("../../../controllers/admin/pages/services.controller");
const { authLogin, isAdmin } = require("../../../utils/auth");

router.get("/admin/services", authLogin, isAdmin,  manageServicePage);

module.exports = router;
