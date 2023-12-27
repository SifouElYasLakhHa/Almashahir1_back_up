const express = require('express');

const router = express.Router();
const {
    childPanelsPage,
} = require('../../../controllers/all/pages/childPanels.controller');
const {
  mexAuthLogin,
} = require('../../../utils/auth');

router.get('/child-panels', mexAuthLogin, childPanelsPage);

module.exports = router;
