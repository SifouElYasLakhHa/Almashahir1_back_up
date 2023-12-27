const express = require('express');

const router = express.Router();
const {
  faqPage,
} = require('../../../controllers/all/pages/faqs.controller');
const {
  mexAuthLogin,
} = require('../../../utils/auth');

router.get('/faqs', mexAuthLogin, faqPage);

module.exports = router;
