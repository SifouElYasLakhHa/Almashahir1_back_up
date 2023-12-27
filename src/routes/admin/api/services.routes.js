const express = require("express");

const router = express.Router();
const {
  createService,
  updateService,
  deleteService,
  viewService,
  disableService,
  updateSortService,
  copyService,
} = require("../../../controllers/admin/api/services.controller");
const { 
  authLogin,
  isAdmin, 
 } = require("../../../utils/auth");

router.post("/admin/service/add", authLogin, isAdmin, createService);
router.put("/admin/service/update/:serviceId/:mode", authLogin, isAdmin, updateService);
router.delete("/admin/service/delete/:serviceId", authLogin, isAdmin, deleteService);
router.get("/admin/service/view/:serviceId", authLogin, isAdmin, viewService);
router.put("/admin/service/disable/:serviceId", authLogin, isAdmin, disableService);
router.put("/admin/service/sort/:firstServiceId/:secondServiceId", authLogin, authLogin, updateSortService); // isAdmin, authLogin,
router.post("/admin/service/copy/:serviceId", authLogin, isAdmin, copyService);

module.exports = router;