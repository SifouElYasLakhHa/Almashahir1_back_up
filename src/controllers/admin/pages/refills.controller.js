const db = require('../../../models/index');
const { capitalizeFirstLetter } = require('./../../../utils/auth');
require('dotenv').config();

exports.refillsPage = async (req, res) => {
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
          points: req.user.points
      }
    } : false;
    db.Refills.find({})
    .populate('serviceId orderId userId')
    .then((findRefills) => {
      findRefills.sort(function(a, b){return b.createAt - a.createAt});
      return res.render('pages/manageRefills', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'التعويض',
          user,
          refills: findRefills,
          url: '/admin/refills',
      });
    })
    .catch((e) => {
        return res.status(500).json({
            error: true,
            status: false,
            type: 'Find refills',
            status: true,
            all: {
                status: true,
                message: 'please contact developer for fixing issues',
            }
        });
    })
    
  } catch (e) {
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
          status: true,
          message: 'please contact developer for fixing issues',
      }
    });
  }
};

exports.refillsPageSpecial = async (req, res) => {
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
          points: req.user.points
      }
    } : false;
    db.Refills.find({ 
      status: capitalizeFirstLetter(req.params.refillsType) 
    })
    .populate('serviceId orderId userId')
    .then((findRefills) => {
      findRefills.sort(function(a, b){return b.createAt - a.createAt});
      return res.render('pages/manageRefills', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'التعويض',
        user,
        refills: findRefills,
        url: '/admin/refills',
      });
    })
    .catch((e) => {
        return res.status(500).json({
            error: true,
            status: false,
            type: 'Find refills',
            status: true,
            all: {
                status: true,
                message: 'please contact developer for fixing issues',
            }
        });
    })
    
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
          status: true,
          message: 'please contact developer for fixing issues',
      }
    });
  }
};
