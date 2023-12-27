const db = require("../../../models/index");

exports.manageChildPanelsPage = async (req, res) => {
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

        
        db.RequestChildPanels.find({})
        .select('requestChildPanel domain currency username status createAt updateAt userId')
        .populate('userId')
        .then((findRequestChildPanels) => {
          findRequestChildPanels.sort(function(a, b){return b.createAt - a.createAt});
          //console.log(findRequestChildPanels)
          return res.render('pages/manageChildPanels', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'متجرك الخاص',
            user,
            requestChildPanels: findRequestChildPanels,
            url: '/admin/child-panels'
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
