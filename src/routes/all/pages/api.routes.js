const express = require('express');

const router = express.Router();
const {
    apiPage,
} = require('../../../controllers/all/pages/api.controller');
const {
  mexAuthLogin,
} = require('../../../utils/auth');

router.get('/api', mexAuthLogin, apiPage);

module.exports = router;
