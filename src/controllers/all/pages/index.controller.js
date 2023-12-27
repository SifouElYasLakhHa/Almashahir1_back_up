const db = require('../../../models/index');
require('dotenv').config();

exports.indexPage = async (req, res) => {
  try {
    db.Orders.find({})
    .then((orders) => {
      db.Tickets.find({
        userId: req.user._id,
        status: 'waiting_user'
      })
      .then((tickets) => {
        return res.render('pages/dashboard', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
          user: {
            balance: {
              total: req.user.balance.total.toFixed(4),
              spent: req.user.balance.spent.toFixed(4),
            },
            role: req.user.role,
            avatar: req.user.avatar,
            gender: req.user.gender,
            rate: req.user.rate,
            username: req.user.username,
          },
          url: '',
          orders: {
            id: orders.length + Number(process.env.NUMBER_ORDER),
          },
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
    
  } catch (e) {
    return res.status(500).json({
      error: true,
      type: 'site',
      all: {
        status: true,
        message: 'please contact developer for fixing issues',
      },
    });
  }
};
/*
exports.indexPage = async (req, res) => {
  try {
    db.Orders.find({})
    .then((orders) => {
      //console.log(req.user.balance)
      return res.render('pages/dashboard', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
        user: {
          balance: {
            total: req.user.balance.total.toFixed(4),
            spent: req.user.balance.spent.toFixed(4),
          },
          role: req.user.role,
          avatar: req.user.avatar,
          gender: req.user.gender,
          rate: req.user.rate,
          username: req.user.username,
          
        },
        url: '',
        orders: {
          id: orders.length + Number(process.env.NUMBER_ORDER),
        }
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
      all: {
        status: true,
        message: 'please contact developer for fixing issues',
      },
    });
  }
};*/
