const express = require('express');

const router = express.Router();

const {
  manageUsersPage,
  createUser,
  updateDetailsUser,
  usersPage,
  updatePassword,
  deleteUser,
  suspendUser,
  getHistorySignIn,
  viewUser,
} = require('../../../controllers/admin/api/users.controller');

const {
  authLogin,
  isAdmin, 
} = require('../../../utils/auth');


router.post('/admin/user/add', authLogin, isAdmin, createUser);
router.put('/admin/user/update/:userId', authLogin, isAdmin, updateDetailsUser);
router.put('/admin/user/update/password/:userId', isAdmin, authLogin, updatePassword);

//router.get('/users', authLogin, manageUsersPage);

router.get('/users', authLogin, isAdmin, usersPage);
router.delete('/admin/users/delete/:userId', authLogin, isAdmin, deleteUser);
router.put('/admin/users/suspend/:userId', authLogin, isAdmin, suspendUser);
router.get('/admin/users/history/:userId', authLogin, isAdmin, getHistorySignIn);
router.get('/admin/users/view/:userId', authLogin, isAdmin, viewUser);

module.exports = router;