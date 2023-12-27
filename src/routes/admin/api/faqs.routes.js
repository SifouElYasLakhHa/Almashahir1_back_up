const express = require("express");

const router = express.Router();
const {
  createFaq,
  updateFaq,
  deleteFaq,
  viewFaq,
} = require("../../../controllers/admin/api/faqs.controller");
const {
  authLogin,
  isAdmin,
} = require('../../../utils/auth');

router.post("/admin/faq/add", authLogin, isAdmin, createFaq);
router.put("/admin/faq/update/:faqId", authLogin, isAdmin, updateFaq);
router.delete("/admin/faq/delete/:faqId", authLogin, isAdmin, deleteFaq);
router.get("/admin/faq/view/:faqId", isAdmin, viewFaq);
module.exports = router;
