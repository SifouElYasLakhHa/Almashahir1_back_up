const db = require("../../../models/index");

const { getServices } = require('../../../utils/auth');

exports.manageServicePage = async (req, res) => {
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
   /* db.Categories.find({}).then((categories) => {
      console.log('/********1******** /')
      console.log(categories)
    })
    db.Categories.find({}, (err, categories) => {
      if(err) {
        return res.status(500).json({
          status: false,
          type: "error",
          issues: {
            status: true,
            all: {
              status: true,
              message: "حدث خطأ ما تواصل مع الدعم الفني"
            }
          }
        });
      }
      console.log('/**********1****** /')
      console.log(categories)
      return res.status(200).json({
        status: true,
        type: "succ",
        categories,
      });
    })*/
    //console.log('hi')
    db.Categories.find({})
    .then((categories) => {
      categories.sort(function(a, b){return a.sort - b.sort});
      db.Providers.find({}, async (err, providers) => {
        if(err) {
          return res.status(500).json({
            error: true,
            type: 'site',
            message: 'please contact developer for fixing issues',
          });
        }
        if(categories.length === 0) {
          return res.render('pages/manageServices', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'ادارة الخدمات',
            user,
            categories: [],
            providers
          });
        }
        else {
           var categoriesArray = [];
           var i = 0;
           for(var c of categories) {
            categoriesArray.push({
              category: categories[i],
              services: await getServices(c._id).then((rs) => rs.services),
            })
            i++;
           }
           //console.log(categoriesArray)
           return res.render('pages/manageServices', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'ادارة الخدمات',
            user,
            categories: categoriesArray,
            providers,
            url: '/admin/services',
          });
        }
      })
    })
    .catch((e) => {
      console.log(e)
      return res.status(500).json({
        error: true,
        status: false,
        type: 'site',
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
      status: false,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};
