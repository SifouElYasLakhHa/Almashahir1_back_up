const db = require('../../../models/index');
const {
    getUsernameUser,
  } = require('../../../utils/auth');

exports.managePaymentsPage = async (req, res) => {
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

        db.Transactions.find({})
        .populate('paymentId userId')
        .then(async (transactions) => {
            //console.log(transactions)
            let transactionsArray = [];
            
           /* for (var index = transactions.length - 1; index = 0; index--) {
               
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
                    transactionId: transactions[index].transactionId,
                    refunded: transactions[index].refunded || false,
                    receipt_url: transactions[index].receipt_url || ""
                })
            }
            console.log(transactionsArray)*/
            
          await  transactions.forEach(async (obj, index) => {
                if(index < 70) {
                   // constol.log()
                  // console.log(transactions)
                   if(Array.isArray(transactions) && transactions.length !== 0) { 
                    //return
                    //console.log(await getUsernameUser(transactions[transactions.length - (1 + index)].userId).then(rs => rs.username))
                   /* if(transactions[transactions.length - (1 + index)].discount !== 0) {
                        await  transactionsArray.push({
                            createAt: transactions[transactions.length - (1 + index)].createAt,
                            transaction: transactions[transactions.length - (1 + index)].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                            paymentType: 'مكافئة للاداع رقم ' + transactions[transactions.length - (1 + index)].transaction,
                            amount: transactions[index].discount * transactions[transactions.length - (1 + index)].amount / 100,
                        })
                    }   */                 
                    //console.log(transactions[transactions.length - (1 + index)].userId)
                   // console.log(transactions)
                    console.log(transactionsArray)
                      
                    await transactionsArray.push({
                            createAt: transactions[transactions.length - (1 + index)].createAt,
                            transaction: transactions[transactions.length - (1 + index)].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                            paymentType: "", //transactions[transactions.length - (1 + index)].paymentId.name
                            amount: transactions[transactions.length - (1 + index)].amount,
                            transactionId: transactions[transactions.length - (1 + index)].transactionId,
                            refunded: transactions[transactions.length - (1 + index)].refunded || false,
                            receipt_url: transactions[transactions.length - (1 + index)].receipt_url || "",
                            username: transactions[transactions.length - (1 + index)].userId.username,
                            //await getUsernameUser([transactions.length - (1 + index)].userId).then(rs => rs.username) || "",
                        })
                    } else return
                    
                } else return
            })
            
            return res.render('pages/managePayments', {
                mainTitle: process.env.APP_NAME,
                host: process.env.HOST,
                subTitle: 'المدفوعات',
                user,
                transactions: transactionsArray,
                transactionsCount: Math.floor(transactions.length / 70) + 1,
                count: 1,
                url: 'Payments',
            });
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
        
      } catch (error) {
        return res.status(500).json({
          error: true,
          type: 'site',
          status: false,
          all: {
            status: true,
            message: 'please contact developer for fixing issues 2',
          }
        });
      }
};

exports.managePaymentsPageSpecial = async (req, res) => {
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
  
          db.Transactions.find({})
          .populate('paymentId userId')
          .then((transactions) => {
            //console.log(transactions)
            
              let transactionsArray = [];
             transactions.forEach(async(obj, index) => {
                  if(index < (70 * req.params.transactionsCount) && index > (70 * req.params.transactionsCount - 70)) {
                     /* if(transactions[transactions.length - (1 + index)].discount !== 0) {
                          transactionsArray.push({
                              createAt: transactions[transactions.length - (1 + index)].createAt,
                              transaction: transactions[transactions.length - (1 + index)].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                              paymentType: 'مكافئة للاداع رقم ' + transactions[index].transaction,
                              amount: transactions[transactions.length - (1 + index)].discount * transactions[index].amount / 100,
                          })
                      }*/
                      
                      transactionsArray.push({
                          createAt: transactions[transactions.length - (1 + index)].createAt,
                          transaction: transactions[transactions.length - (1 + index)].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                          paymentType: '', // transactions[transactions.length - (1 + index)].paymentId.name
                          amount: transactions[transactions.length - (1 + index)].amount,
                          transactionId: transactions[transactions.length - (1 + index)].transactionId,
                          refunded: transactions[transactions.length - (1 + index)].refunded || false,
                          receipt_url: transactions[transactions.length - (1 + index)].receipt_url || "",
                          description: transactions[transactions.length - (1 + index)].description,
                          username: transactions[transactions.length - (1 + index)].userId.username,
                      })


                      /* if(transactions[transactions.length - (1 + index)].discount !== 0) {
                        await  transactionsArray.push({
                            createAt: transactions[transactions.length - (1 + index)].createAt,
                            transaction: transactions[transactions.length - (1 + index)].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                            paymentType: 'مكافئة للاداع رقم ' + transactions[transactions.length - (1 + index)].transaction,
                            amount: transactions[index].discount * transactions[transactions.length - (1 + index)].amount / 100,
                        })
                    }   */                 
                    //console.log(transactions[transactions.length - (1 + index)].userId)
                   
                   // console.log( await getUsernameUser(transactions[transactions.length - (1 + index)].userId).then(rs => rs.username))
                      
                    /* transactionsArray.push({
                            createAt: transactions[transactions.length - (1 + index)].createAt,
                            transaction: transactions[transactions.length - (1 + index)].transaction + Number(process.env.NUMBER_TRASNACTIONS),
                            paymentType: "", //transactions[transactions.length - (1 + index)].paymentId.name
                            amount: transactions[transactions.length - (1 + index)].amount,
                            transactionId: transactions[transactions.length - (1 + index)].transactionId,
                            refunded: transactions[transactions.length - (1 + index)].refunded || false,
                            receipt_url: transactions[transactions.length - (1 + index)].receipt_url || "",
                            username: await getUsernameUser(transactions[transactions.length - (1 + index)].userId).then(rs => rs.username),
                            //await getUsernameUser([transactions.length - (1 + index)].userId).then(rs => rs.username) || "",
                        })*/
                  } 
              })
              console.log(transactionsArray)
              return res.render('pages/managePayments', {
                mainTitle: process.env.APP_NAME,
                host: process.env.HOST,
                subTitle: 'المدفوعات',
                user,
                transactions: transactionsArray,
                transactionsCount: Math.floor(transactions.length / 70) + 1,
                count: Number(req.params.transactionsCount),
                url: 'Payments',
            });
             // console.log(req.params.transactionsCount)
              
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