const db = require('../../../models/index');
require('dotenv').config();

exports.childPanelsPage = async (req, res) => {
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
    
   



    db.Tickets.find({
      userId: req.user._id,
      status: 'waiting_user'
    })
    .then((tickets) => {
      db.RequestChildPanels.find({ 
        userId: req.user._id
      })
      .select('requestChildPanel domain currency username status createAt updateAt')
      .then((findRequestChildPanels) => {
        findRequestChildPanels.sort(function(a, b){return b.createAt - a.createAt});
        return res.render('pages/child-panels', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'متجرك الخاص',
          user,
          requestChildPanels: findRequestChildPanels,
          url: 'child-panels',
          tickets: tickets.length,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          error: true,
          type: 'findRequestChildPanels',
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
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
    
   
    
  } catch (error) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      all: {
        status: true,
        message: 'please contact developer for fixing issues',
      }
    });
  }
};
