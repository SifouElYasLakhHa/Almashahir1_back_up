const express = require('express');

const router = express.Router();
const {
    manageChildPanelsPage,
} = require('../../../controllers/admin/pages/childPanels.controller');
const {
  authLogin,
  isAdmin,
} = require('../../../utils/auth');

router.get('/admin/child-panels', authLogin, isAdmin, manageChildPanelsPage);

module.exports = router;

//manageChildPanelsPage