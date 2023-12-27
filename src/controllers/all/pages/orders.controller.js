const db = require('../../../models/index');
var moment = require('moment'); 
const { capitalizeFirstLetter } = require('./../../../utils/auth');
require('dotenv').config();

exports.ordersPage = async (req, res) => {
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

    db.Tickets.find({
      userId: req.user._id,
      status: 'waiting_user'
    })
    .then((tickets) => {
      db.Orders.find({
        userId: req.user._id,
      })
      .populate('serviceId')
      .then((orders) =>{
        orders.sort(function(a, b){return b.createAt - a.createAt});
        var orderArray = [];
        orders.forEach((obj, index) => {
          ////console.log(orders[index].order)
          var refill = {
            value: '',
            status: false,
            after: ''
          };
          var dateUpdateAt = moment(orders.updateAt).format('MM/DD/YYYY');
       //   dateUpdateAt = moment(orders.updateAt).format('MM/DD/YYYY');
          var dateNow = moment().format('MM/DD/YYYY');
          var date1 = new Date(dateUpdateAt);
          var date2 = new Date(dateNow);
          var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60), 10); 
          switch(orders[index].status) {
            case 'Completed': {
              refill.value = 'Completed';
              refill.status = orders[index].refill === false? false:orders[index].refillTimeStartNow;
              refill.after = orders[index].refillTime;
              break;
            }
            case 'Pending': {
              refill.value = 'Pending';
              break;
            }
            case 'Inprogress': {
              refill.value = 'Inprogress';
              break;
            }
            case 'Partial': {
              refill.value = 'Partial';
              break;
            }
            case 'Processing': {
              refill.value = 'Processing';
              break;
            }
            case 'Canceled': {
              refill.value = 'Canceled';
              break;
            }
          }
          ////console.log(refill)
          if(index < 70) {
            if(!orders[index].serviceId === false) {
              orderArray.push({
                _id: orders[index]._id,
                order: orders[index].order + Number(process.env.NUMBER_ORDER),
                createAt: orders[index].createAt,
                name: orders[index].serviceId.name,
                link: orders[index].link,
                start_count: orders[index].start_count,
                status: orders[index].status,
                quantity: orders[index].quantity,
                service: orders[index].serviceId.service,
                charge: orders[index].charge,
                refill,
              });
            } else {
              orderArray.push({
                _id: orders[index]._id,
                order: orders[index].order + Number(process.env.NUMBER_ORDER),
                createAt: orders[index].createAt,
                name: 'هذه الخدمة محذوفة',
                link: orders[index].link,
                start_count: orders[index].start_count,
                status: orders[index].status,
                quantity: orders[index].quantity,
                service: 'هذه الخدمة محذوفة',
                charge: orders[index].charge,
                refill,
              });
            }
          } else return
        })
        ////console.log(orderArray)
        return res.render('pages/orders', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'طلباتي',
          user,
          orders: orderArray,
          orderCount: Math.floor(orders.length/70) + 1,
          count: 1,
          orderType: '',
          url: 'orders',
          tickets: tickets.length,
        });
      })
      .catch((e) => {
       ////console.log(e)
        return res.status(500).json({
          error: true,
          type: 'findOrder',
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
        });
      });
      
    })
    .catch((e) => {
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
  } catch (e) {
   // //console.log(e)
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

exports.ordersPageSpecial = async (req, res) => {
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
    db.Orders.find({
      userId: req.user._id,
      status: capitalizeFirstLetter(req.params.orderType)
    })
    .populate('serviceId')
    .then((orders) =>{
      orders.sort(function(a, b){return b.createAt - a.createAt});
      var orderArray = [];
      orders.forEach((obj, index) => {
        ////console.log(orders[index])
        var refill = {
          value: '',
          status: false,
          after: ''
        };
        var dateUpdateAt = orders.updateAt;
        dateUpdateAt = moment(orders.updateAt).format('MM/DD/YYYY');
        var dateNow = moment().format('MM/DD/YYYY');
        var date1 = new Date(dateUpdateAt);
        var date2 = new Date(dateNow);
        var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60), 10); 
        ////console.log('diffDays')
        ////console.log(diffDays)
        switch(orders[index].status) {
          case 'Completed': {
            refill.value = 'Completed';
          }
          case 'Pending': {
            refill.value = 'Pending';
          }
          case 'Inprogress': {
            refill.value = 'Inprogress';
          }
          case 'Partial': {
            refill.value = 'Partial';
          }
          case 'Processing': {
            refill.value = 'Processing';
          }
          case 'Canceled': {
            refill.value = 'Canceled';
          }
        }
        if(index < 70) {
          if(!orders[index].serviceId === false) {
            orderArray.push({
              _id: orders[index]._id,
              order: orders[index].id + Number(process.env.NUMBER_ORDER),
              createAt: orders[index].createAt,
              name: orders[index].serviceId.name,
              link: orders[index].link,
              start_count: orders[index].start_count,
              status: orders[index].status,
              quantity: orders[index].quantity,
              service: orders[index].serviceId.service,
              charge: orders[index].charge,
              refill,
            });
          } else {
            orderArray.push({
              _id: orders[index]._id,
              order: orders[index].id + Number(process.env.NUMBER_ORDER),
              createAt: orders[index].createAt,
              name: 'هذه الخدمة محذوفة',
              link: orders[index].link,
              start_count: orders[index].start_count,
              status: orders[index].status,
              quantity: orders[index].quantity,
              service: 'هذه الخدمة محذوفة',
              charge: orders[index].charge,
              refill,
            });
          }

        } else return
      })
      ////console.log(Math.floor(orders.length/70))
      return res.render('pages/orders', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'طلباتي',
        user,
        orders: orderArray,
        orderCount: Math.floor(orders.length/70) + 1,
        count: 1,
        orderType: req.params.orderType
      });
    })
    .catch((e) => {
     // //console.log(e)
      return res.status(500).json({
        error: true,
        type: 'findOrder',
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      });
    });
  } catch (e) {
    ////console.log(e)
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

exports.ordersPageSpecialTwo = async (req, res) => {
  try {
    ////console.log(req.user._id)
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
    } : false;
    ////console.log(orders)
    var objFind = {}
    objFind.userId = req.user._id;
    if(req.params.orderType !== 'all') {
      objFind.status = capitalizeFirstLetter(req.params.orderType)
    }
    ////console.log(objFind)
    db.Orders.find(objFind)
    .populate('serviceId')
    .then((orders) =>{
      orders.sort(function(a, b){return b.createAt - a.createAt});
      var orderArray = [];
      for(var index = Number(req.params.orderCount) * 70 - 70; index < Number(req.params.orderCount); index++) {
        var refill = {
          value: '',
          status: false,
          after: ''
        };
        var dateUpdateAt = orders.updateAt;
        dateUpdateAt = moment(orders.updateAt).format('MM/DD/YYYY');
        var dateNow = moment().format('MM/DD/YYYY');
        var date1 = new Date(dateUpdateAt);
        var date2 = new Date(dateNow);
        var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60), 10); 

        switch(orders[index].status) {
          case 'Completed': {
            refill.value = 'Completed';
            orders[index].refill? refill.status = true:refill.status = false;
            orders[index].refill? refill.after = orders[index].refillTime:false;
          }
          case 'Pending': {
            refill.value = 'Pending';
          }
          case 'Inprogress': {
            refill.value = 'Inprogress';
          }
          case 'Partial': {
            refill.value = 'Partial';
          }
          case 'Processing': {
            refill.value = 'Processing';
          }
          case 'Canceled': {
            refill.value = 'Canceled';
          }
        }
        if(index < 70) {
          if(!orders[index].serviceId === false) {
            orderArray.push({
              _id: orders[index]._id,
              order: orders[index].id + Number(process.env.NUMBER_ORDER),
              createAt: orders[index].createAt,
              name: orders[index].serviceId.name,
              link: orders[index].link,
              start_count: orders[index].start_count,
              status: orders[index].status,
              quantity: orders[index].quantity,
              service: orders[index].serviceId.service,
              charge: orders[index].charge,
              refill,
            });
          } else {
            orderArray.push({
              _id: orders[index]._id,
              order: orders[index].id + Number(process.env.NUMBER_ORDER),
              createAt: orders[index].createAt,
              name: 'هذه الخدمة محذوفة',
              link: orders[index].link,
              start_count: orders[index].start_count,
              status: orders[index].status,
              quantity: orders[index].quantity,
              service: 'هذه الخدمة محذوفة',
              charge: orders[index].charge,
              refill,
            });
          }
        } else return
      }
      ////console.log(Math.floor(orders.length/70))
      return res.render('pages/orders', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'طلباتي',
        user,
        orders: orderArray,
        orderCount: Math.floor(orders.length/70) + 1,
        count: req.params.orderCount,
        orderType: req.params.orderType
      });
    })
    .catch((e) => {
      ////console.log(e)
      return res.status(500).json({
        error: true,
        type: 'findOrder',
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      });
    });
  } catch (e) {
    ////console.log(e)
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