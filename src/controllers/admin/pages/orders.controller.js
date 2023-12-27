const db = require('../../../models/index');
var moment = require('moment'); 

const { capitalizeFirstLetter } = require('./../../../utils/auth')
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

    
    db.Orders.find({
    })
    .populate('serviceId userId')
    .then((orders) =>{
      orders.sort(function(a, b){return b.createAt - a.createAt});
      var orderArray = [];
      orders.forEach((obj, index) => {
        //console.log(orders[index])
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
       // //console.log('diffDays')
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
       // console.log()
      //  if() {
          if(index < 70) {
            if(!orders[index].serviceId === false) {
              orderArray.push({
                _id: orders[index]._id,
                chargeProvider: orders[index].chargeProvider,
                order: Number(orders[index].order) + Number(process.env.NUMBER_ORDER),
                originalOrder: orders[index].order,
                orderProviderId: Number(orders[index].orderProviderId),
                serviceId: orders[index].serviceId.service,
                serviceProviderId: orders[index].serviceId.serviceProviderId,
                createAt: orders[index].createAt,
                name: orders[index].serviceId.name,
                link: orders[index].link,
                start_count: orders[index].start_count,
                status: orders[index].status,
                quantity: orders[index].quantity,
                service: orders[index].serviceId.service,
                serviceProvider: orders[index].serviceId.providerId.toString() === '62a8457b372ef535c05526db'? 'Secsers':'Justanotherpanel',
                charge: orders[index].charge,
                refill,
                username: orders[index].userId.username,
                checkerCharge: orders[index].checkerCharge,
              });
            } else {
              orderArray.push({
                _id: orders[index]._id,
                order: Number(orders[index].order) + Number(process.env.NUMBER_ORDER),
                originalOrder: orders[index].order,
                orderProviderId: Number(orders[index].orderProviderId),
                serviceId: 'هذه الخدمة محذوفة',
                serviceProviderId: 'هذه الخدمة محذوفة',
                createAt: orders[index].createAt,
                name: 'هذه الخدمة محذوفة',
                chargeProvider: orders[index].chargeProvider,
                link: orders[index].link,
                start_count: orders[index].start_count,
                status: orders[index].status,
                quantity: orders[index].quantity,
                service: 'هذه الخدمة محذوفة',
                serviceProvider: orders[index].serviceId.providerId.toString() === '62a8457b372ef535c05526db'? 'Secsers':'Justanotherpanel',
                charge: orders[index].charge,
                refill,
                username: orders[index].userId.username,
                checkerCharge: orders[index].checkerCharge,
              });
            }
            
          } else return
        //}
       
      })
      return res.render('pages/orders', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'طلباتي',
        user,
        orders: orderArray,
        orderCount: Math.floor(orders.length/70) + 1,
        count: 1,
        orderType: '',
        url: '/admin/faqs',
      });
    })
    .catch((e) => {
      console.log(e)
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
    
    db.Orders.find({
      status: capitalizeFirstLetter(req.params.orderType)
    })
    .populate('serviceId userId')
    .then((orders) =>{
      
      orders.sort(function(a, b){return b.createAt - a.createAt});
      //orders.sort(function(a, b){return a.sort - b.sort});
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
          if(!orders[index].serviceId !== false) {
            orderArray.push({
              _id: orders[index]._id,
              order: Number(orders[index].order) + Number(process.env.NUMBER_ORDER),
              originalOrder: orders[index].order,
              orderProviderId: Number(orders[index].orderProviderId),
              serviceId: 'هذه الخدمة محذوفة',
              serviceProviderId: 'هذه الخدمة محذوفة',
              createAt: orders[index].createAt,
              name: 'هذه الخدمة محذوفة',
              link: orders[index].link,
              start_count: orders[index].start_count,
              status: orders[index].status,
              quantity: orders[index].quantity,
              chargeProvider: orders[index].chargeProvider,
              service: 'هذه الخدمة محذوفة',
              charge: orders[index].charge,
              refill,
              username: orders[index].userId.username,
              checkerCharge: orders[index].checkerCharge,
            });
          } else {
            orderArray.push({
              _id: orders[index]._id,
              order: Number(orders[index].order) + Number(process.env.NUMBER_ORDER),
              originalOrder: orders[index].order,
              orderProviderId: Number(orders[index].orderProviderId),
              serviceId: orders[index].serviceId.service,
              serviceProviderId: orders[index].serviceId.serviceProviderId,
              createAt: orders[index].createAt,
              name: orders[index].serviceId.name,
              link: orders[index].link,
              start_count: orders[index].start_count,
              chargeProvider: orders[index].chargeProvider,
              status: orders[index].status,
              quantity: orders[index].quantity,
              service: orders[index].serviceId.service,
              charge: orders[index].charge,
              refill,
              username: orders[index].userId.username,
              checkerCharge: orders[index].checkerCharge,
            });
          }
          
        } else return
      })
      ////console.log(Math.floor(orders.length/70))
      return res.render('pages/orders', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'ادارة الطلبات',
        user,
        orders: orderArray,
        orderCount: Math.floor(orders.length/70) + 1,
        count: 1,
        orderType: req.params.orderType,
        url: '/admin/faqs',
      });
    })
    .catch((e) => {
      console.log(e)
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
    //console.log(e)
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
    if(req.params.orderType !== 'all') {
      objFind.status = capitalizeFirstLetter(req.params.orderType)
    }
    //console.log('Test');
    db.Orders.find(objFind)
    .populate('serviceId userId')
    .then((orders) =>{
      //orders.sort(function(a, b){return b.createAt - a.createAt});
      //console.log(orders[orders.length > Number(req.params.orderCount) * 70?Number(req.params.orderCount) * 70:orders.length - 1])
      var orderArray = [];
      for(var index = Number(req.params.orderCount) * 70 - 70; index < (orders.length > Number(req.params.orderCount) * 70?Number(req.params.orderCount) * 70:orders.length); index++) {
        
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
        if(!orders[index].serviceId !== false) {
          orderArray.push({
            _id: orders[index]._id,
            order: Number(orders[index].order) + Number(process.env.NUMBER_ORDER),
            originalOrder: orders[index].order,
            orderProviderId: Number(orders[index].orderProviderId),
            serviceId: 'هذه الخدمة محذوفة',
            serviceProviderId: 'هذه الخدمة محذوفة',
            createAt: orders[index].createAt,
            name: 'هذه الخدمة محذوفة',
            chargeProvider: orders[index].chargeProvider,
            link: orders[index].link,
            start_count: orders[index].start_count,
            status: orders[index].status,
            quantity: orders[index].quantity,
            service: 'هذه الخدمة محذوفة',
            charge: orders[index].charge,
            refill,
            username: orders[index].userId.username,
            checkerCharge: orders[index].checkerCharge,
          });
        } else {
          orderArray.push({
            _id: orders[index]._id,
            order: Number(orders[index].order) + Number(process.env.NUMBER_ORDER),
            originalOrder: orders[index].order,
            orderProviderId: Number(orders[index].orderProviderId),
            serviceId: orders[index].serviceId.service,
            serviceProviderId: orders[index].serviceId.serviceProviderId,
            createAt: orders[index].createAt,
            name: orders[index].serviceId.name,
            link: orders[index].link,
            start_count: orders[index].start_count,
            status: orders[index].status,
            quantity: orders[index].quantity,
            service: orders[index].serviceId.service,
            chargeProvider: orders[index].chargeProvider,
            charge: orders[index].charge,
            refill,
            username: orders[index].userId.username,
            checkerCharge: orders[index].checkerCharge,
          });
        }

      }
      console.log(orderArray)
      return res.render('pages/orders', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'ادارة الطلبات',
        user,
        orders: orderArray,
        orderCount: Math.floor(orders.length/70) + 1,
        count: req.params.orderCount,
        orderType: req.params.orderType,
        url: '/admin/faqs',
      });
    })
    .catch((e) => {
      console.log(e);
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
    console.log(e);
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