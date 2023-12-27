const express = require("express");

const router = express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory
} = require("../../../controllers/admin/pages/categories.controller");
const { 
  authLogin,
  isAdmin
 } = require("../../../utils/auth");

router.post("/admin/categories", authLogin, isAdmin, createCategory);
router.put("/admin/categories/:id", authLogin, isAdmin, updateCategory);
router.delete("/admin/categories/:id", authLogin, isAdmin, deleteCategory);

module.exports = router;
