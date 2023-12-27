const db = require('../../../models/index');

exports.viewsSettings = async (req, res) => {
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
    return res.render('pages/manageSettings', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'الاعدادات العامة',
      user,
      url: '/admin/settings',
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};