const db = require('../../../models/index');

exports.manageTicketsPage = async (req, res) => {
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

    db.Tickets.find({})
    .populate('userId')
    .then((findtTickets) => {
      findtTickets.sort(function(a, b){return b.createAt - a.createAt});
      return res.render('pages/tickets', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'الدعم الفني',
        user,
        tickets: findtTickets,
        url: '/admin/tickets',
      });
    })
    .catch((e) => {
      console.log(e)
      return res.status(500).json({
        error: true,
        type: 'findtTickets',
        status: false,
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
      status: false,
      all: {
        status: true,
        message: 'please contact developer for fixing issues',
      }
    });
  }
};

