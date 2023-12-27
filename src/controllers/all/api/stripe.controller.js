const db = require('../../../models/index');
var axios = require('axios');
require('dotenv').config();

const { 
  randomProducts,
} = require("../../../utils/auth");

exports.createInvoice = async (req, res) => {
  try {
    const issues = {
      status: false,
      paymentMethodId: {
        status: false,
        message: ""
      },
      price: {
        status: false,
        message: ""
      },
      mode: {
        status: false,
        message: ""
      }
    };
    const { paymentMethodId, price } = req.body;
    //var price = 10, paymentMethodId = '6264d10804f7353b28e4ed16';

    //console.log(req.body)
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues: {
          status: true,
          all: {
            status: true,
            message: "كل الحقول مطلوبة"
          }
        }
      });
    }
    if (typeof price === "undefined") {
      issues.status = true;
      issues.price.status = true;
      issues.price.message = "حقل مطلوب";
    } else if(!price) {
      issues.status = true;
      issues.price.status = true;
      issues.price.message = "حقل مطلوب";
    } else if(typeof Number(price) !== "number") {
      issues.status = true;
      issues.price.status = true;
      issues.price.message = "You should send price as number or number as string";
    }
    if (typeof paymentMethodId === "undefined") {
      issues.status = true;
      issues.paymentMethodId.status = true;
      issues.paymentMethodId.message = "حقل مطلوب";
    } else if(typeof paymentMethodId !== "string") {
      issues.status = true;
      issues.paymentMethodId.status = true;
      issues.description.message = "You should send paymentMethodId as string";
    }

    if(issues.status) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues,
      });
    }
    const productsOrder = await randomProducts(price).then((rs) => rs);
    db.Payments.findOne({ _id: paymentMethodId })
    .then((findPayment) => {
      if(!findPayment) {
        return res.status(500).json({
          error: true,
          type: 'Find',
          message: 'This payment not exist in our system :( please contact developer for fixing issues',
        });
      } else {
        if(findPayment.min > price) {
          issues.status = true;
          issues.price.status = true;
          issues.price.message = "أقل حد للدفع هو" + findPayment.min + '$';
          return res.status(400).json({
            status: false,
            type: "error",
            issues
          });
        } else {
          db.Transactions.find({})
          .then((transactions) => {
              console.log(transactions);
              db.Transactions.create({
                transaction: transactions.length === 0? 1: transactions[transactions.length - 1].transaction + 1,
                description: productsOrder,
                amount: price, //findPayment.discount !== 0? findPayment.discount * price / 100 + price:
                userId: req.user._id,
                discount: Number(findPayment.discount),
                paymentId: findPayment._id
              })
              .then((newTransactions) => {
                //return res.redirect(`${process.env.HOST_SECOND}/transaction/${newTransactions._id}?price=${price}&description=${productsOrder}`);
                //console.log(`${process.env.HOST_SECOND}/transaction/${newTransactions._id}?price=${price}&description=${productsOrder}`)
                return res.status(200).json({
                  error: false,
                  status: true,
                  redirect: true,
                  link: `${process.env.HOST_SECOND}/transaction/${newTransactions._id}?price=${price}&description=${productsOrder}`
                });
                //return
                 // `${process.env.HOST_SECOND}/transaction/${newTransactions._id}?price=${price}&description=${productsOrder}`
                /*var config = {
                  method: 'get',
                  url: `${process.env.HOST_SECOND}/transaction/${newTransactions._id}?price=${price}&description=${productsOrder}`,
                };
                axios(config)
                .then(function (response) {
                  //console.log('response')
                  //console.log(response)
                  return res.status(200).json({
                    error: false,
                    status: true,
                    redirect: true,
                    link: `${process.env.HOST_SECOND}/succ`
                  });
                })
                .catch(function (error) {
                  return res.redirect(`/addfunds`);
                });*/
                //send request to second service
              })
              .catch((err) => {
                console.log(err)
                return res.status(500).json({
                  error: true,
                  status: false,
                  type: 'Create transactions',
                  message: 'please contact developer for fixing issues',
                });
              })
          })
          .catch((err) => {
            console.log(err)
            return res.status(500).json({
              error: true,
              status: false,
              type: 'Find transactions',
              message: 'please contact developer for fixing issues',
            });
          })
        }
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        status: false,
        type: 'Find payment',
        message: 'please contact developer for fixing issues',
      });
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      status: true,
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
};
exports.checkTransactionsExist = async (req, res) => {
  try {
    db.Transactions.findOne({ _id: req.params.transactionId })
    .then((transaction) => {
      if(!transaction) {
        return res.status(500).json({
          error: true,
          status: false,
          redirect: true,
          type: 'Find transaction',
          issues: {
            status: true,
            all: {
              status: true,
              message: "حدث خطأ ما تواصل مع الدعم الفني"
            },
            linkRedirection: {
              status: true,
              linkRedirection: `${process.env.HOST}addfunds`,
              message: "حدث خطأ ما تواصل مع الدعم الفني"
            },
          }
        });
        
      } else {
        return res.status(200).json({
          error: false,
          redirect: false,
          status: true,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        status: false,
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      error: true,
      status: false,
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
}
exports.updateTransactionsApi = async (req, res) => {
  try {
    db.Transactions.findOne({ _id: req.params.transactionId })
    .then(async (transaction) => {
      if(!transaction) {
        return res.status(500).json({
          error: true,
          status: false,
          type: 'Find transaction',
          redirect: true,
          linkRedirection: `${process.env.HOST}addfunds`
        });
      } else {
       // console.log(req.body)
        transaction.transactionId = req.body.transactionApiId;
        await transaction.save();
        return res.status(200).json({
          error: true,
          redirect: false,
          status: true,
        });
      }
    })
    .catch((err) => {
      // console.log(err);
      return res.status(500).json({
        error: true,
        status: false,
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      status: false,
      type: 'Global',
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
}

exports.updateTransactionsDetailsSuccessApi = async (req, res) => {
  try {
    //console.log('hi');
    db.Transactions.findOne({ _id: req.params.transactionId })
    .then(async (transaction) => {
      //console.log(transaction)
      //return
      db.Users.findOne({
        _id: transaction.userId
      })
      .then(async (findUser) => {
        findUser.balance.total = findUser.balance.total + transaction.amount + (transaction.discount * transaction.amount / 100);
        await findUser.save();
        console.log(findUser);
        return res.status(200).json({ status: true })
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
         error: true,
         status: false,
         type: 'findUser',
         issues: {
           status: true,
           all: {
             status: true,
             message: "حدث خطأ ما تواصل مع الدعم الفني"
           }
         }
       });
      })
    })
    .catch((e) => {
      console.log(e);
       return res.status(500).json({
        error: true,
        status: false,
        type: 'Find transaction',
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })
  } catch(e) {
    return res.status(500).json({
      error: true,
      status: false,
      type: 'Global',
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
}


exports.updateTransactionsDetailsApi = async (req, res) => {
  try {
    db.Transactions.findOne({ transactionId: req.params.transactionId })
    .then(async (transaction) => {
      //console.log(req.params.transactionId)
      //return
      if(!transaction) {
        console.log(transaction)
        return res.status(500).json({
          error: true,
          status: false,
          type: 'Find transaction',
          redirect: true,
          linkRedirection: `${process.env.HOST}addfunds`
        });
      } else {
        transaction.transactionStatus = req.body.transactionStatus;
        transaction.customerDetails.address.city = req.body.customerDetails.address.city;
        transaction.customerDetails.address.country = req.body.customerDetails.address.country;
        transaction.customerDetails.address.line1 = req.body.customerDetails.address.line1;
        transaction.customerDetails.address.line2 = req.body.customerDetails.address.line2;
        transaction.customerDetails.address.postal_code = req.body.customerDetails.address.postal_code;
        transaction.customerDetails.name = req.body.customerDetails.name;
        transaction.customerDetails.phone = req.body.customerDetails.phone;
        transaction.paymentMethodDetails.type = req.body.paymentMethodDetails.type;
        transaction.paymentMethodDetails.card.brand = req.body.paymentMethodDetails.card.brand;
        transaction.paymentMethodDetails.card.country = req.body.paymentMethodDetails.card.country;
        transaction.paymentMethodDetails.card.exp_month = req.body.paymentMethodDetails.card.exp_month;
        transaction.paymentMethodDetails.card.exp_year = req.body.paymentMethodDetails.card.exp_year;
        transaction.paymentMethodDetails.card.funding = req.body.paymentMethodDetails.card.funding;
        transaction.paymentMethodDetails.card.network = req.body.paymentMethodDetails.card.network;
        transaction.paymentMethodDetails.card.three_d_secure = req.body.paymentMethodDetails.card.three_d_secure;
        transaction.amountRefunded = req.body.amountRefunded;
        transaction.calculatedStatementDescriptor = req.body.calculatedStatementDescriptor;
        transaction.transactionStatus = req.body.transactionStatus;
        transaction.refunded = req.body.refunded;
        transaction.receiptUrl = req.body.receiptUrl;
        transaction.currency = req.body.currency;
        
        await transaction.save();
        return res.status(200).json({
          error: false,
          redirect: false,
          status: true,
        });
      }
    })
    .catch((err) => {
       console.log(err);
       return res.status(500).json({
        error: true,
        status: false,
        type: 'Find transaction',
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      status: false,
      type: 'Global',
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
}

