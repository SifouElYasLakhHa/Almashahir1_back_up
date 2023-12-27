const db = require('../../../models/index');
require('dotenv').config();

exports.updatesPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
    } : false;
    
    if(typeof req.user !== 'undefined') {
      db.Tickets.find({
        userId: req.user._id,
        status: 'waiting_user'
      })
      .then((tickets) => {
        return res.render('pages/updates', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'التحديثات',
          user,
          url: 'updates',
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
      return res.render('pages/updates', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'التحديثات',
        url: 'updates',
        user,
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
