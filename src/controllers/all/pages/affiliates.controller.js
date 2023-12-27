const db = require('../../../models/index');
require('dotenv').config();

exports.affiliatesPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
      visits: req.user.visits,
      affiliateSuccessful: req.user.affiliateSuccessful,
      affiliateRegistration: req.user.affiliateRegistration,
      earnMoney: {
        balance: req.user.earnMoney.balance.toFixed(2),
        all: (req.user.earnMoney.payed + req.user.earnMoney.balance).toFixed(2),
      },
    } : false;

    if(typeof req.user !== 'undefined') {
      db.Tickets.find({
        userId: req.user._id,
        status: 'waiting_user'
      })
      .then((tickets) => {
        return res.render('pages/affiliates', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'التسويق بالعمولة',
          user,
          url: 'affiliates',
          tickets: tickets.length,
          affiliate: req.user.affiliate,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          error: true,
          type: 'site',
          all: {
            status: true,
             message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
          },
        });
      })
    } else {
      return res.render('pages/affiliates', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'التسويق بالعمولة',
        user,
        url: 'affiliates',
        affiliate: req.user.affiliate,
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: true,
      type: 'site',
       message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
    });
  }
};

exports.affiliatesOnePage = async (req, res) => {
  try {
    db.Users.findOne({
      affiliate: req.params.affiliate
    })
    .then(async (findUserAff) => {
      if(!findUserAff) {
        return res.redirect('/registre');
      } else {
        findUserAff.visits += 1;
        await findUserAff.save();
        return res.redirect(`/registre?ref=${req.params.affiliate}`)
      }
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'site',
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
      });
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      type: 'site',
       message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
    });
  }
};

exports.visitsAffiliate = async (req, res) => {
  try {
    db.Users.findOne({
      affiliate: req.params.affiliate
    })
    .then(async (findUsers) => {
      if(!findUsers) {
      } else {
        findUsers.visits += 1;
        await findUsers.save();
      }
      return res.status(200).json({ status: true });
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'site',
        status: findUsers,
        all: {
          message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
          status: true
        }
      });
    })
  } catch(e) {
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
        message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        status: true
      }
    });
  }
}