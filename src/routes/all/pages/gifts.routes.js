const express = require('express');

const router = express.Router();
const {
    giftsPage,
} = require('../../../controllers/all/pages/gifts.controller');
const {
  mexAuthLogin,
} = require('../../../utils/auth');

router.get('/gifts', mexAuthLogin, giftsPage);

module.exports = router;
