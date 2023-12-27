const db = require('../../../models/index');

exports.providersPage = async (req, res) => {
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
      
      db.Providers.find({})
      .then((providers) => {
        providers.sort(function(a, b){return b.createAt - a.createAt});
        return res.render('pages/manageProviders', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'ادارة الموزعين',
          user,
          providers,
          url: '/admin/faqs',
        });
      })
      .catch((err) => {
        return res.status(500).json({
            error: true,
            type: 'site',
            message: 'please contact developer for fixing issues',
          });
      })
      
    } catch (error) {
      //  console.log(error)
      return res.status(500).json({
        error: true,
        type: 'site',
        message: 'please contact developer for fixing issues',
      });
    }
  };
  