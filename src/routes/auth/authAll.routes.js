const express = require('express');

const router = express.Router();
const {
  loginApi,
  registreApi,
  changeKeyApi,
  changePassUser,
  requestForgetPassword,
  changePasswordForget,
  signOutApi,
  changeGender,
} = require('../../controllers/auth/authAll.controller');

const { 
  authLogin,
 } = require("../../utils/auth");

router.post('/login', loginApi);
router.post('/registre', registreApi);
router.put('/key_api/update', authLogin, changeKeyApi);
router.put('/password/update', authLogin, changePassUser);
router.post('/password/forget', requestForgetPassword);
router.post('/password/changePasswordForget/:resetPasswordId', changePasswordForget);
router.get('/sign_out', authLogin, signOutApi);
router.put('/gender/update', authLogin, changeGender);

module.exports = router;