const db = require('../../../models/index');
require('dotenv').config();

exports.updateDetailsPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
      user: {
        points: req.user.points,
        username: req.user.username,
        email: req.user.email,
        gender: req.user.gender,
        _id: req.user._id,
        full_name: req.user.lastName + ' ' + req.user.firstName,
      }
    } : false;
    
    db.Tickets.find({
      userId: req.user._id,
      status: 'waiting_user'
    })
    .then((tickets) => {
      return res.render('pages/account', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'بروفايلي',
        user,
        url: 'account',
        tickets: tickets.length, 
      }); 
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'site',
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        },
      });
    })
    

  } catch (error) {
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
