const express = require('express');

const router = express.Router();

const {
    registrePage,
    forgetPasswordPage,
    forgetPasswordUpdatePage,
} = require('../../controllers/auth/authAllPages.controller');
const { 
    authLoginAllPage,
} = require('../../utils/auth');

router.get('/registre', authLoginAllPage, registrePage);
router.get('/resetpassword', forgetPasswordPage);
router.get('/resetpassword/:resetPasswordId', forgetPasswordUpdatePage);
module.exports = router;