
const db = require("../../../models/index");
var moment = require('moment'); 
require('dotenv').config();
const { 
    createRefillApi,
   } = require("../../../utils/auth");

exports.createRefill = (req, res) => {
    try {
        db.Orders.findOne({
            order: Number(req.params.orderId) - Number(process.env.NUMBER_ORDER)
        })
        .populate('serviceId')
        .then((findOrder) => {
            if(!findOrder) {
                return res.status(500).json({
                    error: true, status: false,
                    type: 'findOrder',
                    issues: {
                        status: true,
                        order: {
                            status: false,
                            message: 'This order not exist :( please contact the developers :( :(',
                        }
                    }
                });
            } else {
                if(req.user._id.toString() === findOrder.userId.toString()) {
                    if(!findOrder.serviceId.refill.status) {
                        return res.status(500).json({
                            error: true, status: false,
                            type: 'findService',
                            issues: {
                                status: true,
                                refill: {
                                    status: false,
                                    message: 'لا يمكنك عمل استرجاع لهذا الطلب راج وصف الخدمة.',
                                }
                            }
                        }); 
                    } else if(findOrder.serviceId.refill.status && findOrder.refillTimeStartNow && findOrder.refill){
                        db.Providers.findOne({
                            _id: findOrder.serviceId.providerId
                        })
                        .then((findProvider) => {
                            if(!findProvider) {
                                return res.status(500).json({
                                    error: true, status: false,
                                    type: 'findProvider',
                                    issues: {
                                        status: true,
                                        all: {
                                            status: false,
                                            message: 'Please contact developer for fixing issues',
                                        }
                                    }
                                }); 
                            } else {
                                db.Refills.find({})
                                .then(async (refills) => {
                                    db.Refills.create({
                                        refill: refills.length === 0? 1: refills[refills.length - 1].refill + 1,
                                        orderId: findOrder._id,
                                        userId: req.user._id,
                                        serviceId: findOrder.serviceId,
                                        order: findOrder.order
                                    })
                                    .then(async (newRefill) => {
                                       // console.log(newRefill)
                                       // return
                                        //console.log(newRefill)
                                        
                                        //console.log(createRefillApi)
                                        db.Orders.findOne({
                                            order: Number(req.params.orderId) - Number(process.env.NUMBER_ORDER)
                                        })
                                        .then(async (findOrder) => {
                                            if(!findOrder) {
                                                return res.status(500).json({
                                                    error: true, status: false,
                                                    type: 'findOrder',
                                                    issues: {
                                                        status: true,
                                                        all: {
                                                            status: false,
                                                            message: 'Please contact developer for fixing issues',
                                                        }
                                                    }
                                                });  
                                            } else {
                                                const createRefillApiResponse = await createRefillApi({
                                                    orderId: findOrder._id  
                                                }, {
                                                    url: findProvider.linkApi,
                                                    key: findProvider.key,
                                                }, {
                                                    refillId: newRefill._id
                                            })
                                                if(createRefillApiResponse.status) {
                                                    findOrder.refillTimeStartNow = false;
                                                    findOrder.refill = false;
                                                    await findOrder.save();
                                                    return res.status(200).json({
                                                        error: false, 
                                                        status: true,
                                                        message: 'تم انشاء طلب استرجاع بنجاح',
                                                    });
                                                } else {
                                                    findOrder.refillTimeStartNow = false;
                                                    findOrder.refill = false;
                                                    await findOrder.save();
                                                    newRefill.status = 'Rejected'
                                                    await newRefill.save();
                                                    return res.status(500).json({
                                                        error: false, 
                                                        status: true,
                                                        message: 'لا يمكنك استرجاع هذا الطلب تواصل مع الدعم الفني ان كنت تعتقد اننا على خطا  شكرا على تفهمك',
                                                    });
                                                }
                                            }
                                        })
                                        .catch((e) => {
                                            return res.status(500).json({
                                                error: true, status: false,
                                                type: 'createRefillApi',
                                                issues: {
                                                    status: true,
                                                    all: {
                                                        status: false,
                                                        message: createRefillApi.error,
                                                    }
                                                }
                                            });
                                        })
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                        return res.status(500).json({
                                            error: true, status: false,
                                            type: 'newRefill',
                                            issues: {
                                                status: true,
                                                all: {
                                                    status: false,
                                                    message: 'Please contact developer for fixing issues',
                                                }
                                            }
                                        }); 
                                    })
                                    
                                })
                                .catch((e) => {
                                    return res.status(500).json({
                                        error: true, status: false,
                                        type: 'findRefills',
                                        issues: {
                                            status: true,
                                            all: {
                                                status: false,
                                                message: 'please contact developer for fixing issues',
                                            }
                                        }
                                    }); 
                                })
                            }
                        })
                        .catch((e) => {
                            return res.status(500).json({
                                error: true, status: false,
                                type: 'findProvider',
                                issues: {
                                    status: true,
                                    all: {
                                        status: false,
                                        message: 'Please contact developer for fixing issues',
                                    }
                                }
                            }); 
                        })
                        

                        //const createAt = findOrder.createAt;
                       /* var dateNow = moment().format('MM/DD/YYYY');
                        var dateCreateAt = moment(findOrder.serviceId.createAt).format('MM/DD/YYYY');
                        var date1 = new Date(dateCreateAt);
                        var date2 = new Date(dateNow);
                        var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10); 
                        //console.log(findOrder.serviceId.refill.days);
                        if(diffDays > Number(findOrder.serviceId.refill.days)) {
                            return res.status(500).json({
                                error: true, status: false,
                                type: 'findService',
                                issues: {
                                    status: true,
                                    refill: {
                                        status: false,
                                        message: ' عذرا لقد أنتهيت صلاحية استرداد الطلب والذي هو 48 ساعة تواصل مع الدعم ان كنت تظن أننا على خطا',
                                    }
                                }
                            }); 
                        } else {
                            //console.log(findOrder)
                            db.Providers.findOne({
                                _id: findOrder.serviceId.providerId
                            })
                            .then((findProvider) => {
                                if(!findProvider) {
                                    return res.status(500).json({
                                        error: true, status: false,
                                        type: 'findProvider',
                                        issues: {
                                            status: true,
                                            all: {
                                                status: false,
                                                message: 'Please contact developer for fixing issues',
                                            }
                                        }
                                    }); 
                                } else {
                                    db.Refills.find({})
                                    .then(async (refills) => {
                                        db.Refills.create({
                                            refill: refills.length === 0? 1: refills[refills.length - 1].refill + 1,
                                            orderId: findOrder._id,
                                            userId: req.user._id,
                                            serviceId: findOrder.serviceId,
                                        })
                                        .then(async (newRefill) => {
                                            //console.log(newRefill)
                                            const createRefillApi = await createRefill({
                                                    orderId: findOrder._id  
                                                }, {
                                                    url: findProvider.linkApi,
                                                    key: findProvider.key,
                                                }, {
                                                    refillId: newRefill._id
                                            })
                                            //console.log(createRefillApi)
                                            db.Orders.findOne({
                                                order: req.params.orderId
                                            })
                                            .then(async (findOrder) => {
                                                if(!findOrder) {
                                                    return res.status(500).json({
                                                        error: true, status: false,
                                                        type: 'newRefill',
                                                        issues: {
                                                            status: true,
                                                            all: {
                                                                status: false,
                                                                message: 'Please contact developer for fixing issues',
                                                            }
                                                        }
                                                    });  
                                                } else {
                                                    if(createRefillApi.status) {
                                                        findOrder.refillTimeStartNow = false;
                                                        findOrder.refill = false;
                                                        await findOrder.save();
                                                        return res.status(200).json({
                                                            error: false, 
                                                            status: true,
                                                            message: 'تم انشاء طلب استرجاع بنجاح',
                                                        });
                                                    } else {
                                                        findOrder.refillTimeStartNow = false;
                                                        findOrder.refill = false;
                                                        await findOrder.save();
                                                        return res.status(500).json({
                                                            error: false, 
                                                            status: true,
                                                            message: 'لا يمكنك استرجاع هذا الطلب تواصل مع الدعم الفني ان كنت تعتقد اننا على خطا  شكرا على تفهمك',
                                                        });
                                                    }
                                                }
                                            })
                                            .catch((e) => {
                                                return res.status(500).json({
                                                    error: true, status: false,
                                                    type: 'createRefillApi',
                                                    issues: {
                                                        status: true,
                                                        all: {
                                                            status: false,
                                                            message: createRefillApi.error,
                                                        }
                                                    }
                                                });
                                            })
    
    
                                            
                                        })
                                        .catch((e) => {
                                            return res.status(500).json({
                                                error: true, status: false,
                                                type: 'newRefill',
                                                issues: {
                                                    status: true,
                                                    all: {
                                                        status: false,
                                                        message: 'Please contact developer for fixing issues',
                                                    }
                                                }
                                            }); 
                                        })
                                        
                                    })
                                    .catch((e) => {
                                        return res.status(500).json({
                                            error: true, status: false,
                                            type: 'findRefills',
                                            issues: {
                                                status: true,
                                                all: {
                                                    status: false,
                                                    message: 'please contact developer for fixing issues',
                                                }
                                            }
                                        }); 
                                    })
                                }
                            })
                            .catch((e) => {
                                return res.status(500).json({
                                    error: true, status: false,
                                    type: 'findProvider',
                                    issues: {
                                        status: true,
                                        all: {
                                            status: false,
                                            message: 'Please contact developer for fixing issues',
                                        }
                                    }
                                }); 
                            })
                            
                        }*/
                    } else {
                        return res.status(200).json({
                            status: true,
                            type: 'findOrder',
                            message: 'لا يمكنك ارسال طلب استرجاع الان تحقق لاحقا'
                        });
                    }
                } else {
                    return res.status(500).json({
                        error: true, status: false,
                        type: 'create refill',
                        issues: {
                            status: true,
                            all: {
                                status: false,
                                message: 'please contact developer for fixing issues',
                            }
                        }
                    }); 
                }
                
            }
        })
        .catch((e) => {
            return res.status(500).json({
                error: true, status: false,
                type: 'findOrder',
                issues: {
                    status: true,
                    all: {
                        status: false,
                        message: 'please contact developer for fixing issues',
                    }
                }
            });
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
          error: true, status: false,
          type: 'Site',
          issues: {
              status: true,
              all: {
                  status: false,
                  message: 'please contact developer for fixing issues',
              }
          }
        });
    }
}