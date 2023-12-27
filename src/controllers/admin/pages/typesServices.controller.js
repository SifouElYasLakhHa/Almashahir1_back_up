const db = require('../../../models/index');

exports.typeServicesPage = async (req, res) => {
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
      db.TypesServices.find({})
      .then((typesServices) => {
          console.log(typesServices)
        return res.render('pages/typesServices', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'ادارة  أنواع الخدمات',
            user,
            typesServices,
            url: '/admin/type_services',
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
  