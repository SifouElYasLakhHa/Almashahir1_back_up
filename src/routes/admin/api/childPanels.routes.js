const express = require("express");

const router = express.Router();
const {
  childPanelsUpdateStatus,
} = require("../../../controllers/admin/api/childPanels.controller");
const {
  authLogin,
  isAdmin, 
} = require('../../../utils/auth');

router.put("/admin/child_panels/update/:childPanelId", authLogin, isAdmin, childPanelsUpdateStatus);
module.exports = router;
