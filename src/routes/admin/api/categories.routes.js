const express = require("express");

const router = express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  viewCategory,
  viewsCategories,
  disableCategory,
  viewsServicesCategory,
  viewsServicesCategoryException,
  viewsCategoryException,
  updateSortCategory,
} = require("../../../controllers/admin/api/categories.controller");

const { 
  authLogin,
  isAdmin, 
 } = require("../../../utils/auth");

router.post("/admin/category/add", authLogin, isAdmin, createCategory);
router.put("/admin/category/update/:categoryId", authLogin, isAdmin, updateCategory);
router.delete("/admin/category/delete/:categoryId", authLogin, isAdmin, deleteCategory);
router.get("/admin/category/view/:categoryId", authLogin, isAdmin, viewCategory);
router.get("/admin/categories/views", authLogin, viewsCategories);
router.put("/admin/category/disable/:categoryId", authLogin, isAdmin, disableCategory);
router.get("/admin/category/:categoryId/services/views", authLogin, viewsServicesCategory);
router.get("/admin/category/:categoryId/services/:serviceId/views", authLogin, isAdmin, viewsServicesCategoryException);
router.get("/admin/category/:categoryId/views", authLogin, isAdmin, viewsCategoryException);
router.put("/admin/category/sort/:firstCategoryId/:secondCategoryId", authLogin, isAdmin, updateSortCategory);

module.exports = router;
