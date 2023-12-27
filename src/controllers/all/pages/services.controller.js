const db = require('../../../models/index');
const { getServices, getServicesfavorite } = require('../../../utils/auth');
require('dotenv').config();

exports.servicesPage = async (req, res) => {
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
    // sort: { $gt: -1, $lt: 3 }
    db.Tickets.find({
      userId: req.user._id,
      status: 'waiting_user'
    })
    .then((tickets) => {
      db.Categories.find({}, async (err, categories) => {
        if(err) {
          return res.status(500).json({
            error: true,
            type: 'site',
            all: {
              status: true,
              message: 'please contact developer for fixing issues',
            }
          });
        }
        if(categories.length === 0) {
          return res.render('pages/services', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'الخدمات',
            user,
            categories: [],
            providers: [],
            url: 'services'
          });
        }
        else {
          categories.sort(function(a, b){return a.sort - b.sort});
          var categoriesArray = [];
          var i = 0;
          for(var c of categories) {
            categoriesArray.push({
              category: categories[i],
              services: await getServicesfavorite({ categoryId: c._id }, { userId: req.user._id }).then((rs) => rs.services),
            })
            i++;
          }
          //console.log(await getServicesfavorite({ categoryId: c._id }, { userId: req.user._id }).then((rs) => rs.services))
          return res.render('pages/services', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'الخدمات',
            categories: categoriesArray,
            user,
            url: 'services',
            tickets: tickets.length,
          });
        }
        
      })

      
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        type: 'findFaqs',
        issues: {
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
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