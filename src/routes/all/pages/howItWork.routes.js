const express = require('express');

const router = express.Router();
const {
    howItWorkPage,
} = require('../../../controllers/all/pages/howItWork.controller');
const {
  mexAuthLogin,
} = require('../../../utils/auth');

router.get('/howitworks', mexAuthLogin, howItWorkPage);

module.exports = router;
