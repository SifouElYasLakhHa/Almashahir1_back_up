const express = require('express');

const router = express.Router();

const {
  manageUsersPage,
  usersPage,
} = require('../../../controllers/admin/pages/users.controller');

const {
    authLogin, isAdmin, 
} = require('../../../utils/auth');


router.get('/admin/users', authLogin, isAdmin,  usersPage);
module.exports = router;