const db = require('../../models/index');

exports.registrePage = async (req, res) => {
  try {
    return res.render('pages/registre', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
    });
  } catch (error) {
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

exports.forgetPasswordPage = async (req, res) => {
  try {
    return res.render('pages/resetpassword', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'نسيت كلمة المرور',
    });
  } catch (error) {
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

exports.forgetPasswordUpdatePage = async (req, res) => {
  try {
    db.Users.findOne({
      resetPassword: req.params.resetPasswordId
    })
    .then((findUser) => {
      if(!findUser) {
        res.redirect('/resetpassword');
      } else {
        return res.render('pages/resetpasswordUpdate', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'تحديث كلمة المرور',
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        type: 'site',
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      });
    })
  } catch (error) {
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
