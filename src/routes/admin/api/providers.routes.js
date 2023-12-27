const express = require("express");

const router = express.Router();
const {
  createProvider,
  viewsProvider,
  viewServicesProvider,
  updateProvider,
  deleteProvider,
  viewServicesProviderAll,
  importAllServicesProvider,
} = require("../../../controllers/admin/api/providers.controller");
const { 
  mexAuthLogin,
  authLogin,
  isAdmin, 
 } = require("../../../utils/auth");

router.post("/admin/provider/add", authLogin, isAdmin, createProvider);
router.get("/admin/providers", authLogin, isAdmin, viewsProvider);
router.get("/admin/provider/:providerId/services", authLogin, isAdmin, viewServicesProvider);
router.put("/admin/provider/update/:providerId", authLogin, isAdmin, updateProvider);
router.delete("/admin/provider/delete/:providerId", authLogin, isAdmin, deleteProvider);
router.get("/admin/providers/:providerId/services/add_all", authLogin, isAdmin, viewServicesProviderAll);
router.post("/admin/provider/:providerId/services/import_add", authLogin, isAdmin, importAllServicesProvider);

module.exports = router;
