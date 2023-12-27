const express = require("express");

const router = express.Router();
const {
  createProvider,
  viewsProvider,
  viewServicesProvider,
  updateProvider,
  deleteProvider,
} = require("../../../controllers/admin/api/providers.controller");
const { 
  mexAuthLogin,
  authLogin,
 } = require("../../../utils/auth");

router.post("/admin/reffil/add", authLogin, isAdmin, createProvider);

module.exports = router;
