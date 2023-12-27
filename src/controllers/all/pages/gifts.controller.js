const db = require('../../../models/index');
require('dotenv').config();

exports.giftsPage = async (req, res) => {
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
    // console.log(user)
    if(typeof req.user !== 'undefined') {
      db.Tickets.find({
        userId: req.user._id,
        status: 'waiting_user'
      })
      .then((tickets) => {
        return res.render('pages/gifts', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'الهدايا',
          user,
          url: 'girls',
          tickets: tickets.length,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          type: 'findFaqs',
          issues: {
            all: {
              status: true,
              message: 'please contact developer for fixing issues',
            }
          }
        });
      })
    } else {
      return res.render('pages/gifts', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'الهدايا',
        user,
        url: 'girls'
      });
    }
  } catch (error) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
