const express = require("express");

const router = express.Router();
const {
  manageFaqPage
} = require("../../../controllers/admin/pages/faqs.controller");
const { 
  authLogin,
  isAdmin
 } = require("../../../utils/auth");

router.get("/admin/faqs", authLogin, isAdmin, manageFaqPage);

module.exports = router;
