const express = require('express');

const router = express.Router();
const { 
    indexPage,
 } = require('../../../controllers/all/pages/index.controller');
const { 
    authLogin,
    authLoginMain,
 } = require('../../../utils/auth');
 
router.get('/', authLoginMain, indexPage);

module.exports = router;