const db = require('../../../models/index');
require('dotenv').config();

exports.addFundsPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
      user: {
          points: req.user.points
      }
    } : false;
    db.Payments.find({ status: true })
    .select('newUser min max discount name')
    .then((payments) => {
        var paymentsArray = []
        if(req.user.points < 10) {
            for(var p of payments) {
                if(p.newUser) {
                    paymentsArray.push(p)
                }
            }
        } else {
            paymentsArray = payments;
        }
        db.Transactions.find({
          userId: req.user._id
        })
        .populate('paymentId')
        .then((transactions) => {
          //console.log(transactions)
          let transactionsArray = [];
          transactions.forEach((obj, index) => {
            if(index < 70) {
              if(transactions[index].discount !== 0) {
                transactionsArray.push({
                  createAt: transactions[index].createAt,
                  transaction: transactions[index].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                  paymentType: 'مكافئة للاداع رقم ' + transactions[index].transaction,
                  amount: transactions[index].discount * transactions[index].amount / 100,
                })
              }
              transactionsArray.push({
                createAt: transactions[index].createAt,
                transaction: transactions[index].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                paymentType: transactions[index].paymentId.name,
                amount: transactions[index].amount,
              })
            } else return
          })
          db.Tickets.find({
            userId: req.user._id,
            status: 'waiting_user'
          })
          .then((ticketsStatus) => {
            return res.render('pages/addfunds', {
              mainTitle: process.env.APP_NAME,
              host: process.env.HOST,
              subTitle: 'اظافة رصيد',
              user,
              payments: paymentsArray,
              transactions: transactionsArray,
              transactionsCount: Math.floor(transactions.length/70) + 1,
              count: 1,
              url: 'addfunds',
              tickets: ticketsStatus.length,
            });
          })
          .catch((e) => {
            return res.status(500).json({
              error: true,
              type: 'site',
              status: false,
              all: {
                status: true,
                message: 'please contact developer for fixing issues',
              }
            });
          })

        })
        .catch((e) => {
          console.log(e)
          return res.status(500).json({
            error: true,
            type: 'Find transactions',
            status: false,
            all: {
              status: true,
              message: 'please contact developer for fixing issues',
            }
          });
        })
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'Find payments',
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
exports.addFundsPageSpecial = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
      user: {
          points: req.user.points
      }
    } : false;
    db.Payments.find({ status: true })
    .select('newUser min max discount name')
    .then((payments) => {
        var paymentsArray = []
        if(req.user.points < 10) {
            for(var p of payments) {
                if(p.newUser) {
                    paymentsArray.push(p)
                }
            }
        } else {
            paymentsArray = payments;
        }
        db.Transactions.find({
          userId: req.user._id
        })
        .populate('paymentId')
        .then((transactions) => {
          let transactionsArray = [];
          for(var index = Number(req.params.transactionId) * 70 - 70; index < Number(req.params.transactionId); index++) {
            if(transactions[index].discount !== 0) {
              transactionsArray.push({
                createAt: transactions[index].createAt,
                transaction: transactions[index].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                paymentType: 'مكافئة للاداع رقم ' + transactions[index].transaction,
                amount: transactions[index].discount * transactions[index].amount / 100,
              })
            }
            transactionsArray.push({
              createAt: transactions[index].createAt,
              transaction: transactions[index].transaction + Number(process.env.NUMBER_TRASNACTIONS),
              paymentType: transactions[index].paymentId.name,
              amount: transactions[index].amount,
            })
          }
          db.Tickets.find({
            userId: req.user._id,
            status: 'waiting_user'
          })
          .then((ticketsStatus) => {
            return res.render('pages/addfunds', {
              mainTitle: process.env.APP_NAME,
              host: process.env.HOST,
              subTitle: 'اظافة رصيد',
              user,
              payments: paymentsArray,
              transactions: transactionsArray,
              transactionsCount: Math.floor(transactions.length/70) + 1,
              count: Number(req.params.transactionId),
              url: 'addfunds',
              tickets: ticketsStatus.length,
            });
          })
          .catch((e) => {
            return res.status(500).json({
              error: true,
              type: 'site',
              status: false,
              all: {
                status: true,
                message: 'please contact developer for fixing issues',
              }
            });
          })
        })
        .catch((e) => {
          console.log(e)
          return res.status(500).json({
            error: true,
            type: 'Find transactions',
            status: false,
            all: {
              status: true,
              message: 'please contact developer for fixing issues',
            }
          });
        })
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'Find payments',
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
