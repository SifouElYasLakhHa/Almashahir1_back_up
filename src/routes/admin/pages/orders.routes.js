const express = require("express");

const router = express.Router();
const {
    ordersPage,
    ordersPageSpecial,
    ordersPageSpecialTwo,
} = require("../../../controllers/admin/pages/orders.controller");
const { 
  authLogin,
  isAdmin,
 } = require("../../../utils/auth");

router.get("/admin/orders", authLogin, isAdmin,ordersPage);
router.get('/admin/orders/:orderType', authLogin, isAdmin, ordersPageSpecial);
router.get('/admin/orders/:orderType/:orderCount', authLogin,isAdmin, ordersPageSpecialTwo);
module.exports = router;
