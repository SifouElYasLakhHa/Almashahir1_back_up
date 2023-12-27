const db = require('../../../models/index');

const {
  createOrderProvider,
} = require('../../../utils/auth');

const { 
  isUrlValid,
} = require("../../../utils/auth");


exports.createNewOrder = (req, res) => {
  console.log(req.user._id);
  console.log(req.body.link);
  console.log(req.body.serviceId);
  db.Orders.findOne({
    userId: req.user._id,
    link: req.body.link,
    serviceId: req.body.serviceId,
    status: { $nin : ["Partial", "Completed", "Canceled"] }
  })
  .then(async (findOrder) => {
    console.log('findOrder');
    console.log(findOrder);
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.createOrder = async (req, res) => {
  try {
    const issues = {
      status: false,
      quantity: {
        status: false,
        message: '',
      },
      typeService: {
        status: false,
        message: '',
      },
      link: {
        status: false,
        message: '',
      },
      serviceId: {
        status: false,
        message: '',
      },
      charge: {
        status: false,
        message: '',
      },
      addType: {
        status: false,
        message: '',
      },
      comments: {
        status: false,
        message: '',
      },
      answer_number: {
        status: false,
        message: '',
      },
      username: {
        status: false,
        message: '',
      },
      min: {
        status: false,
        message: '',
      },
      max: {
        status: false,
        message: '',
      },
      posts: {
        status: false,
        message: '',
      },
      delay: {
        status: false,
        message: '',
      },
      expiry: {
        status: false,
        message: '',
      },
    };
    var newOrder = {};

    const {
      delay, posts, max, typeService, expiry, min, username, comments, answer_number, quantity, link, serviceId, charge, addType,
    } = req.body;
    
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        type: 'error',
        issues: {
          status: true,
          all: {
            status: true,
            message: 'كل الحقول مطلوبة',
          },
        },
      });
    }
    if (typeof serviceId === 'undefined') {
      issues.status = true;
      issues.serviceId.status = true;
      issues.serviceId.message = 'حقل مطلوب';
    } else if (!serviceId) {
      issues.status = true;
      issues.serviceId.status = true;
      issues.serviceId.message = 'حقل مطلوب';
    } else {
      newOrder.serviceId = serviceId;
    }
    if (typeof charge === 'undefined') {
      issues.status = true;
      issues.charge.status = true;
      issues.charge.message = 'حقل مطلوب';
    } else if (!charge) {
      issues.status = true;
      issues.charge.status = true;
      issues.charge.message = 'حقل مطلوب';
    }
    if (req.user.balance.total < Number(charge)) {
      issues.status = true;
      issues.charge.status = true;
      issues.charge.message = 'لا يوجد رصيد كافي';
    }

    if (typeof addType === 'undefined') {
      issues.status = true;
      issues.addType.status = true;
      issues.addType.message = 'حقل مطلوب';
    } else if (!addType) {
      issues.status = true;
      issues.addType.status = true;
      issues.addType.message = 'حقل مطلوب';
    } else if(addType !== 'api' && addType !== 'manual') {
      issues.status = true;
      issues.addType.status = true;
      issues.addType.message = 'You should send api or manual';
    } else {
      if(typeof typeService === 'undefined') {
        issues.status = true;
        issues.typeService.status = true;
        issues.typeService.message = 'حقل مطلوب';
      } else if(!typeService){
        issues.status = true;
        issues.typeService.status = true;
        issues.typeService.message = 'حقل مطلوب';
      } else {
        console.log(typeService)
        switch(typeService) {
          case 'Poll': {
            if (typeof quantity === 'undefined') {
              issues.status = true;
              issues.quantity.status = true;
              issues.quantity.message = 'حقل مطلوب';
            } else if (!quantity) {
              issues.status = true;
              issues.quantity.status = true;
              issues.quantity.message = 'حقل مطلوب';
            } else if (isNaN(Number(quantity))) {
              issues.status = true;
              issues.quantity.status = true;
              issues.quantity.message = "You should send quantity as number on string like '15' not like 'test'";
            } else {
              newOrder.quantity = quantity;
            }
            if (typeof link === 'undefined') {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if (!link) {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else {
              newOrder.link = link;
            }
            if (typeof answer_number === 'undefined') {
              issues.status = true;
              issues.answer_number.status = true;
              issues.answer_number.message = 'حقل مطلوب';
            } else if (!answer_number) {
              issues.status = true;
              issues.answer_number.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if(isNaN(Number(answer_number))) {
              issues.status = true;
              issues.answer_number.status = true;
              issues.answer_number.message = 'أدخل رابط صحيح';
            } else {
              newOrder.answer_number = answer_number;
            }
            break;
          }
          case 'Default': {
            if (typeof quantity === 'undefined') {
              issues.status = true;
              issues.quantity.status = true;
              issues.quantity.message = 'حقل مطلوب';
            } else if (!quantity) {
              issues.status = true;
              issues.quantity.status = true;
              issues.quantity.message = 'حقل مطلوب';
            } else if (isNaN(Number(quantity))) {
              issues.status = true;
              issues.quantity.status = true;
              issues.quantity.message = "You should send quantity as number on string like '15' not like 'test'";
            } else {
              newOrder.quantity = quantity;
            }
            if (typeof link === 'undefined') {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if (!link) {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if(!isUrlValid(link)) {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'أدخل رابط صحيح';
            } else {
              newOrder.link = link;
            }
            break;
          }
          case 'Custom Comments': {
           // console.log(typeof link === 'undefined')
            if (typeof link === 'undefined') {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if (!link) {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else {
              newOrder.link = link;
            }
            if (typeof comments === 'undefined') {
              issues.status = true;
              issues.comments.status = true;
              issues.comments.message = 'حقل مطلوب';
            } else if (!comments) {
              issues.status = true;
              issues.comments.status = true;
              issues.comments.message = 'حقل مطلوب';
            } else if(comments.length == 0){
              issues.status = true;
              issues.comments.status = true;
              issues.comments.message = 'You should send comments as string on array';      
            } else {
              var commentsStr = ''
              for(var c of comments) {
                commentsStr += c + '\r\n'
              }
              newOrder.comments = encodeURIComponent(commentsStr);
              newOrder.quantity = comments.length;
            }
            break;
          }
          case 'Custom Comments Package': {
           // console.log(link)
            if (typeof link === 'undefined') {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if (!link) {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else {
              newOrder.link = link;
            }
           /* if (typeof comments === 'undefined') {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if (!comments) {
              issues.status = true;
              issues.comments.status = true;
              issues.comments.message = 'حقل مطلوب';
            } else if(comments.length == 0){
              issues.status = true;
              issues.comments.status = true;
              issues.comments.message = 'You should send comments as string on array';      
            } else {
              newOrder.comments = comments;
            }*/
            break;
          }
          case 'Subscriptions': {
            issues.status = true;
            issues.typeService.status = true;
            issues.typeService.message = 'You should type services not type else check please type of service';
            break;
           /* if (typeof username === 'undefined') {
              issues.status = true;
              issues.username.status = true;
              issues.username.message = 'حقل مطلوب';
            } else if (!username) {
              issues.status = true;
              issues.username.status = true;
              issues.username.message = 'حقل مطلوب';
            } else {
              newOrder.username = username;
            }
            if (typeof min === 'undefined') {
              issues.status = true;
              issues.min.status = true;
              issues.min.message = 'حقل مطلوب';
            } else if (!min) {
              issues.status = true;
              issues.min.status = true;
              issues.min.message = 'حقل مطلوب';
            } else if(isNaN(Number(min))) {
              issues.status = true;
              issues.min.status = true;
              issues.min.message = 'You should send min number as string like "5000"';
            }else {
              newOrder.min = min;
            }
            if (typeof max === 'undefined') {
              issues.status = true;
              issues.max.status = true;
              issues.max.message = 'حقل مطلوب';
            } else if (!max) {
              issues.status = true;
              issues.max.status = true;
              issues.max.message = 'حقل مطلوب';
            } else if(isNaN(Number(max))) {
              issues.status = true;
              issues.max.status = true;
              issues.max.message = 'You should send max number as string like "5000"';
            } else {
              newOrder.max = max;
            }
            //console.log(typeof posts === 'undefined')
            if (typeof posts === 'undefined') {
              issues.status = true;
              issues.posts.status = true;
              issues.posts.message = 'حقل مطلوب';
            } else if (!posts) {
              issues.status = true;
              issues.posts.status = true;
              issues.posts.message = 'حقل مطلوب';
            } else {
              newOrder.posts = posts;
            }
           // console.log(req.body)
            if (typeof delay === 'undefined') {
              issues.status = true;
              issues.delay.status = true;
              issues.delay.message = 'حقل مطلوب';
            } else if (!delay) {
              issues.status = true;
              issues.delay.status = true;
              issues.delay.message = 'حقل مطلوب';
            } else if(isNaN(Number(delay))){
              issues.status = true;
              issues.delay.status = true;
              issues.delay.message = 'You should send delay number as string and this valid number 0 5 10 15 30 60 90'
            } else if(delay !== '0' && delay !== '5' && delay !== '10' && delay !== '15' && delay !== '30' && delay !== '60' && delay !== '90') {
              issues.status = true;
              issues.delay.status = true;
              issues.delay.message = 'You should send delay number as string and this valid number 0 5 10 15 30 60 90'
            } else {
              newOrder.delay = delay;
            }*/
            break;
          }
          case 'Package': {
           
            if (typeof link === 'undefined') {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else if (!link) {
              issues.status = true;
              issues.link.status = true;
              issues.link.message = 'حقل مطلوب';
            } else {
              newOrder.link = link;
            }
            break;
          }
          default: {
            console.log('test')
            issues.status = true;
            issues.typeService.status = true;
            issues.typeService.message = 'You should type services not type else check please type of service';
            break;
          }
        }
      }
    }
    
    if (!(typeof expiry === 'undefined' && !expiry)) {
      var splitExpiry = expiry.split('/')
      var varDate = new Date(req.query.expiry);
      var today = new Date();

      if(splitExpiry.length < 3) {
        issues.status = true;
        issues.expiry.status = true;
        issues.expiry.message = 'أدخل تاريخ بشكل صحيح';
      } else if(varDate < today) {
        issues.status = true;
        issues.expiry.status = true;
        issues.expiry.message = 'أدخل تاريخ أكبر من تاريخ اليوم';
      } else {
        newOrder.expiry = expiry;
      }
      
    }
    
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: 'required',
        issues,
      });
    }
    
    db.Services.findOne({
      _id: serviceId,
    })
    .then((service) => {
      if (!service) {
        return res.status(400).json({
          status: false,
          type: 'site',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'حدث خطأ ما تواصل مع الدعم الفني',
            },
            service: {
              status: true,
              message: 'This service not exist check id when send it with request please',
            },
          },
        });
      }
      switch(typeService) {
        case 'Poll': {
          if(Number(quantity) < service.min || Number(quantity) > service.max) {
            issues.status = true;
            issues.quantity.status = true;
            issues.quantity.message = 'You have issues with your code you should send quantity less than or equal to max or greater or equal to mix check service object pelase :)';
          }
          break;
        }
        case 'Default': {
          //console.log(quantity)
          if(Number(quantity) < service.min || Number(quantity) > service.max) {
            issues.status = true;
            issues.quantity.status = true;
            issues.quantity.message = 'You have issues with your code you should send quantity less than or equal to max or greater or equal to mix check service object pelase :)';
          }
          break;
        }
        case 'Subscriptions': {
          break;
        }
        case 'Package': {
          break;
        }
        case 'Custom Comments Package': {
          break;
        }
        case 'Custom Comments': {
          break;
        }
        default: {
          issues.status = true;
          issues.typeService.status = true;
          issues.typeService.message = 'You should type services not type else check please type of service';
          break;
        }
      }
      
      if (issues.status) {
        return res.status(400).json({
          status: false,
          type: 'required',
          issues,
        });
      }
      let calcPriceOrder = 0;
      if(typeService === 'Poll' || typeService === 'Default') {
        calcPriceOrder = Number(quantity) * service.price.newPrice / 1000
      } else if(typeService === 'Package') {
        calcPriceOrder = service.price.newPrice;
      } else if(typeService === 'Custom Comments') {
        calcPriceOrder = comments.length * service.price.newPrice / 1000
      } else if(typeService === 'Subscriptions') {
        calcPriceOrder = 0; // not complet :( :( :(
      } else if(typeService === 'Custom Comments Package') {
        calcPriceOrder = service.price.newPrice;
      }
      calcPriceOrder = calcPriceOrder.toFixed(6);
      if (Number(calcPriceOrder) !== Number(charge)) {
        console.log(Number(calcPriceOrder))
        console.log(Number(charge))
        return res.status(400).json({
          status: false,
          type: 'site',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'حدث خطأ ما تواصل مع الدعم الفني',
            },
            charge: {
              status: true,
              message: 'You should send charge same newprice of (quantity * service.price.newPrice) / 1000 with 6 digit after decimal',
            },
          },
        });
      } else {
        newOrder.charge = Number(charge);
      }
      db.Providers.findOne({
        _id: service.providerId,
      })
      .then(async (provider) => {
        if (!provider) {
          return res.status(400).json({
            status: false,
            type: 'error',
            issues: {
              status: true,
              all: {
                status: true,
                message: 'حدث خطأ ما تواصل مع الدعم الفني',
              },
            },
          });
        }
        let urlRequest = '';
        switch (service.type) {
          case 'Default': {
            urlRequest += `&action=add&service=${service.serviceProviderId}&link=${link}&quantity=${quantity}`;
            break;
          }
          case 'Package': {
            urlRequest += `&action=add&service=${service.serviceProviderId}&link=${link}&quantity=${quantity}`;
            break;
          }
          case 'Custom Comments': {
            urlRequest += `&action=add&service=${service.serviceProviderId}&link=${link}&quantity=${quantity}&comments=${newOrder.comments}`;
            break;
          }
          case 'Custom Comments Package': {
            urlRequest += `&action=add&service=${service.serviceProviderId}&link=${link}&quantity=${quantity}&comments=${newOrder.comments}`;
            break;
          }
          case 'Poll': {
            urlRequest += `&action=add&service=${service.serviceProviderId}&link=${link}&quantity=${quantity}&answer_number=${answer_number}`;
            break;
          }
          case 'Subscriptions': {
            urlRequest += `&action=add&service=${service.serviceProviderId}
            &link=${link}&quantity=${quantity}
            &username=${username}&delay=${delay}
            &min=${min}&max=${max}`;
            break;
          }
          default: {
            return res.status(400).json({
              status: false,
              type: 'site',
              issues: {
                status: true,
                all: {
                  status: true,
                  message: 'حدث خطأ ما تواصل مع الدعم الفني',
                },
                charge: {
                  status: true,
                  message: 'You should check type of service if not Default, Package, Poll or Subscriptions so its not exist in our server',
                },
              },
            });
          }
        }
        db.Orders.findOne({
          userId: req.user._id,
          link,
          serviceId: service._id,
          status: { $nin : ["Partial", "Completed", "Canceled"]}
        })
        .then(async (findOrder) => {
          console.log(findOrder);
           if(!findOrder) {
            db.Providers.findOne({
              _id: service.providerId
            })
            .then(async (findProvider) => {
              if(false) { //
                return res.status(400).json({
                  status: false,
                  type: 'site',
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: 'حدث خطأ ما تواصل مع الدعم الفني',
                    },
                  },
                });
              } else {
                newOrder.userId = req.user._id
                newOrder.refill = service.refill.status
                service.refill.status?newOrder.checkerRefill = true:newOrder.checkerRefill = false;
                db.Orders.find({})
                .then((orderFind)=> {
                  newOrder.order = orderFind.length === 0? 1: orderFind[orderFind.length - 1].order + 1;
                  newOrder.status = 'Pending'
                  db.Orders.create(newOrder)
                  .then((order)=> {
                    db.Users.findOne({
                      _id: req.user._id
                    })
                    .then(async (findUser) => {
                      findUser.balance.total = findUser.balance.total - Number(charge);
                      findUser.balance.spent = findUser.balance.spent + Number(charge);
                      await findUser.save();
                      db.Points.findOne({
                        userId: req.user._id
                      })
                      .then(async (findPoint) => {
                        if(!findPoint) {
                          db.Points.find({})
                          .then((findPoints) => {
                            // create points
                            db.Points.create({
                              point: findPoints.length === 0?1:findPoints[findPoints.length - 1].point + 1,
                              orderId: order.order,
                              userId: req.user._id,
                              orderIds: [order.order]
                            })
                            .then(async(createPoint) => {
                             // console.log(createPoint)
                              db.Orders.findOne({
                                _id: order._id
                              })
                              .then(async (findOrderAfter) => {
                                //console.log('createOrderProviderResponse')
                                var createOrderProviderResponse = await createOrderProvider({
                                  urlRequest: `${findProvider.linkApi}?key=${findProvider.key}${urlRequest}`
                                }).then((rs) => rs);
                                //console.log(createOrderProviderResponse)
                                findOrderAfter.orderProviderId = createOrderProviderResponse.order;
                                //findOrderAfter.orderProviderId = '115444';
                                await findOrderAfter.save();
                                
                                return res.status(200).json({
                                  status: true,
                                  message: 'تم انشاء الطلب بنجاح'
                                });
                              })
                              .catch((e) => {
                                return res.status(400).json({
                                  status: false,
                                  type: 'findOrderAfter',
                                  issues: {
                                    status: true,
                                    all: {
                                      status: true,
                                      message: 'حدث خطأ ما تواصل مع الدعم الفني',
                                    },
                                  },
                                });
                              })
                            })
                            .catch((e) =>{
                              return res.status(400).json({
                                status: false,
                                type: 'create points',
                                issues: {
                                  status: true,
                                  all: {
                                    status: true,
                                    message: 'حدث خطأ ما تواصل مع الدعم الفني',
                                  },
                                },
                              });
                            })
                          })
                          .catch((e) => {
                            return res.status(400).json({
                              status: false,
                              type: 'find points',
                              issues: {
                                status: true,
                                all: {
                                  status: true,
                                  message: 'حدث خطأ ما تواصل مع الدعم الفني',
                                },
                              },
                            });
                          })
                        } else {
                          
                          

                          db.Orders.findOne({
                            _id: order._id
                          })
                          .then(async (findOrderAfter) => {
                            var createOrderProviderResponse = await createOrderProvider({
                              urlRequest: `${findProvider.linkApi}?key=${findProvider.key}${urlRequest}`
                            }).then((rs) => rs);
                            findOrderAfter.orderProviderId = createOrderProviderResponse.order; //
                            await findOrderAfter.save();
                            findPoint.orderIds.push(order.order)
                            await findPoint.save();
                            return res.status(200).json({
                              status: true,
                              message: 'تم انشاء الطلب بنجاح'
                            });
                          })
                          .catch((e) => {
                            return res.status(400).json({
                              status: false,
                              type: 'findOrderAfter',
                              issues: {
                                status: true,
                                all: {
                                  status: true,
                                  message: 'حدث خطأ ما تواصل مع الدعم الفني',
                                },
                              },
                            });
                          })
                        }
                        
                      })
                      .catch((e) => {
                        console.log(e)
                        return res.status(400).json({
                          status: false,
                          type: 'find points',
                          issues: {
                            status: true,
                            all: {
                              status: true,
                              message: 'حدث خطأ ما تواصل مع الدعم الفني',
                            },
                          },
                        });
                      })
                    })
                    .catch((e) => {
                      return res.status(400).json({
                        status: false,
                        type: 'create order',
                        issues: {
                          status: true,
                          all: {
                            status: true,
                            message: 'حدث خطأ ما تواصل مع الدعم الفني',
                          },
                        },
                      });
                    })
                    
                  }) 
                  .catch((err)=> {
                    console.log(err);
                    return res.status(400).json({
                      status: false,
                      type: 'create order',
                      issues: {
                        status: true,
                        all: {
                          status: true,
                          message: 'حدث خطأ ما تواصل مع الدعم الفني',
                        },
                      },
                    });
                  })
                }) 
                .catch((err)=> {
                  console.log(err);
                  return res.status(400).json({
                    status: false,
                    type: 'create order',
                    issues: {
                      status: true,
                      all: {
                        status: true,
                        message: 'حدث خطأ ما تواصل مع الدعم الفني',
                      },
                    },
                  });
                })
              }
            })
            .catch((e) => {
              console.log(e)
              return res.status(400).json({
                status: false,
                type: 'findProvider',
                issues: {
                  status: true,
                  all: {
                    status: true,
                    message: 'حدث خطأ ما تواصل مع الدعم الفني',
                  },
                },
              });
            })
          } else {
           // newOrder.orderProviderId = '545454' //createOrderProviderResponse.order;
            newOrder.userId = req.user._id
            newOrder.refill = false
            newOrder.checkerRefill = false;
            newOrder.refillTimeStartNow = false;
            
            db.Orders.find({})
            .then((orderFind)=> {
              newOrder.order = orderFind.length === 0? 1: orderFind[orderFind.length - 1].order + 1;
              newOrder.status = 'Pending'
              db.Orders.create(newOrder)
              .then((order)=> {
                //console.log(order)
                db.Users.findOne({
                  _id: req.user._id
                })
                .then(async (findUser) => {
                  findUser.balance.total = findUser.balance.total - Number(charge);
                  findUser.balance.spent = findUser.balance.spent + Number(charge);
                  await findUser.save();
                  db.Points.findOne({
                    userId: req.user._id
                  })
                  .then(async (findPoint) => {
                    if(!findPoint) {
                      db.Points.find({})
                      .then((findPoints) => {
                        // create points
                        db.Points.create({
                          point: findPoints.length === 0?1:findPoints[findPoints.length - 1].point + 1,
                          orderId: order.order,
                          userId: req.user._id,
                          orderIds: [order.order]
                        })
                        .then(async (createPoint) => {
                          return res.status(200).json({
                            status: true,
                            message: 'تم انشاء الطلب بنجاح'
                          });


                        })
                        .catch((e) => {
                          return res.status(400).json({
                            status: false,
                            type: 'createPoint',
                            issues: {
                              status: true,
                              all: {
                                status: true,
                                message: 'حدث خطأ ما تواصل مع الدعم الفني',
                              },
                            },
                          });
                        })
                        
                      })
                      .catch((e) => {
                        return res.status(400).json({
                          status: false,
                          type: 'find points',
                          issues: {
                            status: true,
                            all: {
                              status: true,
                              message: 'حدث خطأ ما تواصل مع الدعم الفني',
                            },
                          },
                        });
                      })
                    } else {
                      findPoint.orderIds.push(order.order)
                      await findPoint.save();
                      return res.status(200).json({
                        status: true,
                        message: 'تم انشاء الطلب بنجاح'
                      });
                    }
                    
                  })
                  .catch((e) => {
                    console.log(e)
                    return res.status(400).json({
                      status: false,
                      type: 'find points',
                      issues: {
                        status: true,
                        all: {
                          status: true,
                          message: 'حدث خطأ ما تواصل مع الدعم الفني',
                        },
                      },
                    });
                  })
  
                  
                  
                })
                .catch((e) => {
                  return res.status(400).json({
                    status: false,
                    type: 'create order',
                    issues: {
                      status: true,
                      all: {
                        status: true,
                        message: 'حدث خطأ ما تواصل مع الدعم الفني',
                      },
                    },
                  });
                })
                
              }) 
              .catch((err)=> {
                console.log(err);
                return res.status(400).json({
                  status: false,
                  type: 'create order',
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: 'حدث خطأ ما تواصل مع الدعم الفني',
                    },
                  },
                });
              })
            }) 
            .catch((err)=> {
              console.log(err);
              return res.status(400).json({
                status: false,
                type: 'create order',
                issues: {
                  status: true,
                  all: {
                    status: true,
                    message: 'حدث خطأ ما تواصل مع الدعم الفني',
                  },
                },
              });
            })
          }
        })
        .catch((e) => {
          console.log(e)
          return res.status(400).json({
            status: false,
            type: 'site',
            issues: {
              status: true,
              all: {
                status: true,
                message: 'حدث خطأ ما تواصل مع الدعم الفني',
              },
            },
          });
        })
        
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          status: false,
          type: 'site',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'حدث خطأ ما تواصل مع الدعم الفني',
            },
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: false,
        type: 'site',
        issues: {
          status: true,
          all: {
            status: true,
            message: 'حدث خطأ ما تواصل مع الدعم الفني',
          },
        },
      });
    });
  } catch (err) {
     console.log(err);
    return res.status(500).json({
      status: false,
      type: 'site',
      issues: {
        status: true,
        all: {
          status: true,
          message: 'حدث خطأ ما تواصل مع الدعم الفني',
        },
      },
    });
  }
};