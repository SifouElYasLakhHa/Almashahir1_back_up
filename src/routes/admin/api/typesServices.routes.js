const express = require("express");

const router = express.Router();
const {
    createTypeServices,
    updateTypeServices,
    deleteTypeServices,
    viewsTypeServices,
} = require("../../../controllers/admin/api/typesServices.controller");
const { 
  authLogin,
  isAdmin, 
 } = require("../../../utils/auth");

router.post("/admin/type_services/add", authLogin, isAdmin, createTypeServices);
router.put("/admin/type_services/update/:typeServicesId",authLogin, isAdmin, updateTypeServices);
router.delete("/admin/type_services/delete/:typeServicesId", authLogin, isAdmin, deleteTypeServices);
router.get("/admin/type_services/views", authLogin, isAdmin, viewsTypeServices);

module.exports = router;
