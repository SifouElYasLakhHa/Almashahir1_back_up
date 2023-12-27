const db = require("../../../models/index");
require('dotenv').config();

exports.faqPage = async (req, res) => {
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


    


    if(typeof req.user !== 'undefined') {
      db.Tickets.find({
        userId: req.user._id,
        status: 'waiting_user'
      })
      .then((tickets) => {
        db.Faqs.find({})
      .then((findFaqs) => {
        //console.log('findFaqs')
        console.log(findFaqs)
        return res.render('pages/faq', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'الأسئلة الشائعة',
          user,
          faqs: findFaqs,
          url: 'faqs',
          tickets: tickets.length,
        });
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
      })
      .catch((e) => {
        return res.status(500).json({
          error: true,
          type: 'site',
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          },
        });
      })
    } else {
      db.Faqs.find({})
      .then((findFaqs) => {
        //console.log('findFaqs')
        console.log(findFaqs)
        return res.render('pages/faq', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'الأسئلة الشائعة',
          user,
          url: 'faqs',
          faqs: findFaqs
        });
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
    }


    
    // console.log(user)
    
  } catch (error) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      issues: {
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      }
    });
  }
};
