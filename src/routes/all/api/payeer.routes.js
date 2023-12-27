const express = require('express');

const router = express.Router();
const {
    createPayeerOrder,
} = require('../../../controllers/all/api/payeer.controller');

const { 
    authLogin,
   } = require("../../../utils/auth");

router.post('/payeer/create', authLogin, createPayeerOrder);

module.exports = router;
