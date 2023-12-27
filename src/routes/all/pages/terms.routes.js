const express = require('express');

const router = express.Router();
const { 
    termsPage,
 } = require('../../../controllers/all/pages/terms.controller');
 const { 
    mexAuthLogin,
 } = require('../../../utils/auth');

router.get('/terms', mexAuthLogin, termsPage);

module.exports = router;