const db = require('../../../models/index');
const EmailValidator = require('email-validator');
const { Users } = db;
const {
  generateAuthToken,
  validationUserIfExist,
  validationUserUpdateIfExist,
  hashPasswordUser,
  removeZeroPhone,
} = require('../../../utils/auth');

require('dotenv').config();

exports.manageUsersPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
    } : false;

    return res.render('pages/manageUsers', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ادارة المستخدمين',
      user,
      url: '/admin/refills',
    });
  } catch (error) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};

exports.usersPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
    } : false;
   //  console.log(user)
    Users.find({})
    .select('id balance email  lastName firstName username rate ip country role')
    .then((users) => {
      users.sort(function(a, b){return b.balance.total - a.balance.total});
      return res.render('pages/manageUsers', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'ادارة المستخدمين',
        user,
        users,
        url: '/admin/users',
      });
    })
    .catch((err) => {
      return res.status(402).json({
        error: true,
        type: 'site',
        message: 'please contact developer for fixing issues',
      });
    })
    
  } catch (error) {
      console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
