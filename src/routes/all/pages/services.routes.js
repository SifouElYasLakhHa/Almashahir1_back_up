const express = require('express');

const router = express.Router();
const {
  servicesPage,
} = require('../../../controllers/all/pages/services.controller');
const {
  authLogin,
} = require('../../../utils/auth');

router.get('/services', authLogin, servicesPage);

module.exports = router;
