const express = require('express');

const router = express.Router();

const {
  veiwsService,
  veiwService,
  viewsServicesCategory,
} = require('../../../controllers/all/api/services.controller');

const {
  authLogin,
} = require('../../../utils/auth');

router.get('/services/views/:lastSortCategory', authLogin, veiwsService);
router.get('/service/views/:serviceId', authLogin, veiwService);
router.get('/user/category/:categoryId/service/views', authLogin, viewsServicesCategory);

module.exports = router;