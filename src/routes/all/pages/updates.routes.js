const express = require('express');

const router = express.Router();
const { 
    updatesPage,
 } = require('../../../controllers/all/pages/updates.controller');
 const { 
    mexAuthLogin,
 } = require('../../../utils/auth');

router.get('/updates', mexAuthLogin, updatesPage);

module.exports = router;