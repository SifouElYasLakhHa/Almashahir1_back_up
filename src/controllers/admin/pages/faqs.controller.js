const db = require("../../../models/index");

exports.manageFaqPage = async (req, res) => {
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

    db.Faqs.find({}, (err, faqs) => {
      if(err) {
        return res.status(500).json({
          error: true,
          type: 'site',
          message: 'please contact developer for fixing issues',
        });
      }
      return res.render('pages/manageFaqs', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'ادارة الأسئلة الشائعة',
        user,
        faqs,
        url: '/admin/faqs',
      });
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
