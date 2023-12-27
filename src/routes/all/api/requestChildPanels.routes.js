const express = require("express");

const router = express.Router();
const {
    createChildPanels,
} = require("../../../controllers/all/api/requestChildPanels.controller");
const { 
  authLogin,
} = require("../../../utils/auth");

router.post("/child_panels/add", authLogin, createChildPanels);

module.exports = router;
