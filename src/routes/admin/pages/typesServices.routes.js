const express = require("express");

const router = express.Router();
const {
    typeServicesPage,
} = require("../../../controllers/admin/pages/typesServices.controller");
const { 
  authLogin, isAdmin, 
 } = require("../../../utils/auth");

router.get("/admin/type_services", authLogin, isAdmin,  typeServicesPage);

module.exports = router;
