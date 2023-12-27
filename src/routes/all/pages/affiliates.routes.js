const express = require('express');

const router = express.Router();
const {
    affiliatesPage,
    affiliatesOnePage,
    visitsAffiliate,
} = require('../../../controllers/all/pages/affiliates.controller');
const {
  authLogin,
} = require('../../../utils/auth');

router.get('/affiliates', authLogin, affiliatesPage);
router.get('/ref/:affiliate', affiliatesOnePage);
router.put('/visit/ref/:affiliate', visitsAffiliate);

module.exports = router;
