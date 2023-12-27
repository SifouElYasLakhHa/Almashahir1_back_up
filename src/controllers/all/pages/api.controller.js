const db = require('../../../models/index');
require('dotenv').config();

exports.apiPage = async (req, res) => {
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
    
    if(typeof req.user !== 'undefined') {
      db.Tickets.find({
        userId: req.user._id,
        status: 'waiting_user'
      })
      .then((tickets) => {
        return res.render('pages/api', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          hostApi: 'https://api.almashahir1.com/v1',
          subTitle: 'Api',
          user,
          url: 'api',
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
    } else {
      return res.render('pages/api', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'Api',
        user,
        hostApi: 'https://api.almashahir1.com/v1',
        url: 'api'
      });
    }
    
  } catch (e) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
