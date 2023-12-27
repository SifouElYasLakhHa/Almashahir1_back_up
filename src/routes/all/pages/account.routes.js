const express = require('express');

const router = express.Router();
const {
  updateDetailsPage,
} = require('../../../controllers/all/pages/account.controller');

const { 
  authLogin,
} = require("../../../utils/auth");

router.get('/account', authLogin, updateDetailsPage);

module.exports = router;
