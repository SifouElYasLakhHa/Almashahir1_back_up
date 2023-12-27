require('dotenv').config();

exports.blogPage = async (req, res) => {
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
    // console.log(user)
    return res.render('pages/blog', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'المدونة',
      user,
    });
  } catch (error) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
