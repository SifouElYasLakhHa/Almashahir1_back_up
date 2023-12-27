const express = require('express');

const router = express.Router();
const {
  loginApi,
  registreApi,
} = require('../../controllers/auth/authAll.controller');



module.exports = router;
