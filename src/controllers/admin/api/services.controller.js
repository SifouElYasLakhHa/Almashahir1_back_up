const db = require("../../../models/index");
var mongoose = require('mongoose');
//var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
const {
  getServiceProvider,
  nameToSlug,
} = require('../../../utils/auth');

exports.createService = async (req, res) => {
  try {
    const issues = {
      categoryId: {
        status: false,
        message: ""
      },
      name: {
        status: false,
        message: ""
      },
      mode: {
        status: false,
        message: ""
      },
      providerId: {
        status: false,
        message: ""
      },
      type: {
        status: false,
        message: ""
      },
      rate: {
        type: {
          status: false,
          message: ""
        },
        fixed: {
          status: false,
          message: ""
        },
        percentage: {
          status: false,
          message: ""
        },
        status: {
          status: false,
          message: ""
        },
      },
      min: {
        status: false,
        message: ""
      },
      max: {
        status: false,
        message: ""
      },
      linkDuplicates: {
        status: false,
        message: ""
      },
      refill: {
        status: {
          status: false,
          message: ""
        },
      },
      dripfeed: {
        status: false,
        message: ""
      },
      price:  {
        originalPrice:  {
          status: false,
          message: ""
        },
        newPrice:  {
          status: false,
          message: ""
        },
      },
      serviceProviderId: {
        status: false,
        message: ""
      },
      statusServiceProvider: {
        status: false,
        message: ""
      },
    };

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          all: {
            status: true,
            message: "كل الحقول مطلوبة"
          }
        }
      });
    }
    
    const {
      categoryId,
      name,
      description,
      price,
      serviceProviderId,
      type,
      mode,
      providerId,
      dripfeed,
      refill,
      max,
      min,
      rate,
      linkDuplicates,
      statusServiceProvider,
      sortCategory,
    } = req.body;
  //  console.log('body of request')
    
    let rateObj = {
      status: false,
      type: 0,
      fixed: 0,
      percentage: 0,
    };

    if (!categoryId) {
      issues.status = true;
      issues.categoryId.status = true;
      issues.categoryId.message = "حقل مطلوب";
    }

    if (!name) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
    }

   
   // console.log(req.params.mode !== 'manual')
    if (!mode) {
      issues.status = true;
      issues.mode.status = true;
      issues.mode.message = "حقل مطلوب";
    }  else if (req.body.mode !== 'manual' && req.body.mode !== 'api') {
      issues.status = true;
      issues.mode.status = true;
      issues.mode.message =  "You should send mode as string 'manual' or 'api'"
    }

    if (typeof linkDuplicates === "undefined") {
      issues.status = true;
      issues.linkDuplicates.status = true;
      issues.linkDuplicates.message = "حقل مطلوب";
    } else if(typeof JSON.parse(linkDuplicates) !== "boolean") {
      issues.status = true;
      issues.linkDuplicates.status = true;
      issues.linkDuplicates.message = "يجب أرسال false or true";
    }
    if (req.body.mode === 'api') {
      if (!providerId) {
        issues.status = true;
        issues.providerId.status = true;
        issues.providerId.message = "حقل مطلوب";
      }
      if (!serviceProviderId) {
        issues.status = true;
        issues.name.status = true;
        issues.name.message = "حقل مطلوب";
      }
     /* if (!serviceId) {
        issues.status = true;
        issues.serviceId.status = true;
        issues.serviceId.message = "حقل مطلوب";
      }*/
      if (typeof statusServiceProvider === "undefined") {
        issues.status = true;
        issues.statusServiceProvider.status = true;
        issues.statusServiceProvider.message = "حقل مطلوب";
      } else if(typeof JSON.parse(statusServiceProvider) !== "boolean") {
        issues.status = true;
        issues.statusServiceProvider.status = true;
        issues.statusServiceProvider.message = "يجب أرسال false or true";
      }
    }

    if (typeof dripfeed === "undefined") {
      issues.status = true;
      issues.dripfeed.status = true;
      issues.dripfeed.message = "حقل مطلوب";
    } else if(typeof JSON.parse(dripfeed) !== "boolean") {
      issues.status = true;
      issues.dripfeed.status = true;
      issues.dripfeed.message = "يجب أرسال false or true";
  ``}
    if (!refill) {
      issues.status = true;
      issues.refill.status = true;
      issues.refill.message = "حقل مطلوب";
    } else if(typeof JSON.parse(refill.status)!== "boolean") {
      issues.status = true;
      issues.refill.status.status = true;
      issues.refill.status.message = "يجب أرسال false or true";
    }
    if (!min) {
      issues.status = true;
      issues.min.status = true;
      issues.min.message = "حقل مطلوب";
    }
    if (!max) {
      issues.status = true;
      issues.max.status = true;
      issues.max.message = "حقل مطلوب";
    }
    //console.log(rate)
    if(typeof rate === "undefined") {
      issues.status = true;
      issues.rate.status.status = true;
      issues.rate.status.message = "حقل مطلوب";
    } else if(typeof JSON.parse(rate.status) !== 'boolean'){
      
      issues.status = true;
      issues.rate.status.status = true;
      issues.rate.status.message = "يجب أرسال false (عندما يكون السعر ثابت) true (عندما يكون السعر نسبة مؤوية او زيادة ثابته)";
    } else if(JSON.parse(rate.status)){
      rateObj.status = true
      if(typeof rate.type === "undefined") {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = "حقل مطلوب";
      } else if(!rate.type) {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = "حقل مطلوب";
      } else if(typeof Number(rate.type) !== "number") {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = 'You should send type as number 1, 2 or 3'
      } else if(Number(rate.type) !== 1 && Number(rate.type) !== 2 && Number(rate.type) !== 3) {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = 'You should send type as number 1, 2 or 3'
      } else if(Number(rate.type) === 1) {
        if(typeof rate.fixed === "undefined") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(!rate.fixed) {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(typeof Number(rate.fixed) !== "number") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = 'You should send fixed rate as number 1, 2 or 3'
        } else {
          rateObj.type = 1
          rateObj.fixed = Number(rate.fixed)
        }
      } else if(Number(rate.type) === 2) {
        if(typeof rate.percentage === "undefined") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(!rate.percentage) {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(typeof Number(rate.percentage) !== "number") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = 'You should send percentage rate as number 1, 2 or 3'
        } else {
          rateObj.type = 2
          rateObj.percentage = Number(rate.percentage)
        }
      } else if(Number(rate.type) === 3) {
        if(typeof rate.percentage === "undefined") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(!rate.percentage) {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(typeof Number(rate.percentage) !== "number") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = 'You should send percentage rate as number 1, 2 or 3'
        } else {
          rateObj.type = 3
          rateObj.percentage = Number(rate.percentage)
        }
        if(typeof rate.fixed === "undefined") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(!rate.fixed) {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(typeof Number(rate.fixed) !== "number") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = 'You should send fixed rate as number 1, 2 or 3'
        } else {
          rateObj.type = 3
          rateObj.fixed = Number(rate.fixed);
        }
      }
    } else {
      rateObj.status = false
    }
    if (!type) {
      issues.status = true;
      issues.type.status = true;
      issues.type.message = "حقل مطلوب";
    }
    if (!price) {
      issues.status = true;
      issues.price.originalPrice.status = true;
      issues.price.originalPrice.message = "حقل مطلوب";
      issues.status = true;
      issues.price.newPrice.status = true;
      issues.price.newPrice.message = "حقل مطلوب";
    } else {
      if(!price.originalPrice) {
        issues.status = true;
        issues.price.originalPrice.status = true;
        issues.price.originalPrice.message = "حقل مطلوب";
      }
      if(!price.newPrice) {
        issues.status = true;
        issues.price.newPrice.status = true;
        issues.price.newPrice.message = "حقل مطلوب";
      }
    }
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    
    await db.Services.find({},async (err, services) => {
      if(err) {
        return res.status(500).json({
          status: false,
          type: "error",
          issues: {
            status: true,
            all: {
              status: true,
              message: "حدث خطأ ما تواصل مع المطور"
            }
          }
        });
      }
      var nameToSlugResponse = await nameToSlug(req.body.name);
      //console.log(typeof sortCategory === 'undefined')
      if(typeof sortCategory === 'undefined') {
        if(mode === 'manual') {
          db.Services.find({
            categoryId
          })
          .then((findServicesSortCategory) => {
            db.Services.create({
              service: services.length === 0 ? 1 : services[services.length - 1].service + 1,
              sort: services.length === 0 ? 1 : services[services.length - 1].sort + 1,
              categoryId,
              sortCategory: findServicesSortCategory.length === 0 ? 1:findServicesSortCategory[findServicesSortCategory.length - 1].sortCategory + 1,
              name,
              description: typeof description !== 'undefined'?description: '',
              'price.originalPrice': Number(price.originalPrice),
              'price.newPrice': Number(price.newPrice),
              addType: 'manual',
              type,
              slug: nameToSlugResponse,
              rate: rateObj,
              nameCategoryProvider: req.body.nameCategoryProvider || '',
              minSyc: req.body.minSyc,
              maxSyc: req.body.maxSyc,
              min,
              max,
              dripfeed,
              'refill.status': refill.status,
              'refill.days': typeof refill.days !== 'undefined'? refill.days: '0',
              linkDuplicates, 
            })
            .then((createService) => {
              return res.status(201).json({
                error: false,
                status: true,
                type: "succ",
                message: "تم اضافة الخدمة بنجاح",
                service: createService
              });
            })
            .catch((e) => {
              console.log(e)
              return res.status(500).json({
                status: false,
                type: "error",
                issues: {
                  status: true,
                  all: {
                    status: true,
                    message: "حدث خطأ ما تواصل مع المطور"
                  }
                }
              });
            })
          })
          .catch((e) => {
            console.log(e)
            return res.status(500).json({
              status: false,
              type: "error",
              issues: {
                status: true,
                all: {
                  status: true,
                  message: "حدث خطأ ما تواصل مع المطور"
                }
              }
            });
          })
          
        } else {
          db.Services.find({
            categoryId
          })
          .then((findServicesSortCategory) => {
            db.Services.create({
              service: services.length === 0 ? 1 : services[services.length - 1].service + 1,
              sort: services.length === 0 ? 1 : services[services.length - 1].sort + 1,
              categoryId,
              name,
              providerId,
              sortCategory: findServicesSortCategory.length === 0 ? 1 : findServicesSortCategory[findServicesSortCategory.length - 1].sortCategory + 1,
              description: typeof description !== 'undefined'?description: '',
              'price.originalPrice': Number(price.originalPrice),
              'price.newPrice': Number(price.newPrice),
              minSyc: req.body.minSyc,
              maxSyc: req.body.maxSyc,
              serviceProviderId,
              nameCategoryProvider: req.body.nameCategoryProvider || '',
              addType: 'api',
              type,
              rate: rateObj,
              slug: nameToSlugResponse,
              min,
              max,
              dripfeed,
              'refill.status': refill.status,
              statusServiceProvider,
              linkDuplicates,
            })
            .then((createService) => {
              return res.status(201).json({
                error: false,
                status: true,
                type: "succ",
                message: "تم اضافة الخدمة بنجاح",
                service: createService
              });
            })
          .catch((e) => {
            console.log(e)
            return res.status(500).json({
              status: false,
              type: "error",
              issues: {
                status: true,
                all: {
                  status: true,
                  message: "حدث خطأ ما تواصل مع المطور"
                }
              }
            });
          })
          })
          .catch((e) => {
            console.log(e)
            return res.status(500).json({
              status: false,
              type: "error",
              issues: {
                status: true,
                all: {
                  status: true,
                  message: "حدث خطأ ما تواصل مع المطور"
                }
              }
            });
          })
        
        }
      } else {
        /********************************************************/
        var indexServiceSortNow;
        db.Services.find({
          categoryId
        })
        .then((findServicesSort) => {
          if(findServicesSort.length === 0) {
            if(mode === 'manual') {
              db.Services.find({
                categoryId
              })
              .then((findServicesSortCategory) => {
                db.Services.create({
                  service: services.length === 0 ? 1 : services[services.length - 1].service + 1,
                  sort: services.length === 0 ? 1 : services[services.length - 1].sort + 1,
                  categoryId,
                  name,
                  description: typeof description !== 'undefined'?description: '',
                  'price.originalPrice': Number(price.originalPrice),
                  'price.newPrice': Number(price.newPrice),
                  addType: 'manual',
                  type,
                  slug: nameToSlugResponse,
                  rate: rateObj,
                  nameCategoryProvider: req.body.nameCategoryProvider || '',
                  minSyc: req.body.minSyc,
                  maxSyc: req.body.maxSyc,
                  min,
                  max,
                  dripfeed,
                  'refill.status': refill.status,
                  'refill.days': typeof refill.days !== 'undefined'? refill.days: '0',
                  linkDuplicates, 
                })
                .then((createService) => {
                  return res.status(201).json({
                    error: false,
                    status: true,
                    type: "succ",
                    message: "تم اضافة الخدمة بنجاح",
                    service: createService
                  });
                })
                .catch((e) => {
                  console.log(e)
                  return res.status(500).json({
                    status: false,
                    type: "error",
                    issues: {
                      status: true,
                      all: {
                        status: true,
                        message: "حدث خطأ ما تواصل مع المطور"
                      }
                    }
                  });
                })
              })
              .catch((e) => {
                console.log(e)
                return res.status(500).json({
                  status: false,
                  type: "error",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع المطور"
                    }
                  }
                });
              })
              
            } else {
              db.Services.find({
                categoryId
              })
              .then((findServicesSortCategory) => {
                db.Services.create({
                  service: services.length === 0 ? 1 : services[services.length - 1].service + 1,
                  sort: services.length === 0 ? 1 : services[services.length - 1].sort + 1,
                  categoryId,
                  name,
                  providerId,
                  sortCategory: findServicesSortCategory.length === 0 ? 1 : findServicesSortCategory[findServicesSortCategory.length - 1].sortCategory + 1,
                  description: typeof description !== 'undefined'?description: '',
                  'price.originalPrice': Number(price.originalPrice),
                  'price.newPrice': Number(price.newPrice),
                  minSyc: req.body.minSyc,
                  maxSyc: req.body.maxSyc,
                  serviceProviderId,
                  nameCategoryProvider: req.body.nameCategoryProvider || '',
                  addType: 'api',
                  type,
                  rate: rateObj,
                  slug: nameToSlugResponse,
                  min,
                  max,
                  dripfeed,
                  'refill.status': refill.status,
                  statusServiceProvider,
                  linkDuplicates,
                })
                .then((createService) => {
                  return res.status(201).json({
                    error: false,
                    status: true,
                    type: "succ",
                    message: "تم اضافة الخدمة بنجاح",
                    service: createService
                  });
                })
              .catch((e) => {
                return res.status(500).json({
                  status: false,
                  type: "error",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع المطور"
                    }
                  }
                });
              })
              })
              .catch((e) => {
                return res.status(500).json({
                  status: false,
                  type: "error",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع المطور"
                    }
                  }
                });
              })
            
            }
          } else {
            findServicesSort.sort(function(a, b){return a.sortCategory - b.sortCategory});
            //var sortCategoryId = mongoose.Types.ObjectId(sortCategory);
            var updateSort = false;
            for(var s = 0; s < findServicesSort.length;s++) {
              if(findServicesSort[s]._id.toString() === sortCategory && !updateSort) {
                indexServiceSortNow = findServicesSort[s].sortCategory;
                updateSort = true;
              } else if(updateSort) {
                db.Services.findOne({
                  _id: findServicesSort[s]._id
                })
                .then(async (findServicesSort) => {
                  findServicesSort.sortCategory = findServicesSort.sortCategory + 1;
                  await findServicesSort.save();
                })
                .catch((e) => {
                  console.log(e)
                  return res.status(500).json({
                    status: false,
                    type: "error",
                    issues: {
                      status: true,
                      all: {
                        status: true,
                        message: "حدث خطأ ما تواصل مع المطور"
                      }
                    }
                  });
                })
                s++
              } else {
                s++
              }
            }
           // console.log(indexServiceSortNow)
            /************************************ start sort services *********************************/
            if(mode === 'manual') {
              db.Services.find({
                categoryId
              })
              .then((findServicesSortCategory) => {
                db.Services.create({
                  service: services.length === 0 ? 1 : services[services.length - 1].service + 1,
                  sort: services.length === 0 ? 1 : services[services.length - 1].sort + 1,
                  sortCategory: indexServiceSortNow,
                  categoryId,
                  name,
                  description: typeof description !== 'undefined'?description: '',
                  'price.originalPrice': Number(price.originalPrice),
                  'price.newPrice': Number(price.newPrice),
                  addType: 'manual',
                  type,
                  slug: nameToSlugResponse,
                  rate: rateObj,
                  nameCategoryProvider: req.body.nameCategoryProvider || '',
                  minSyc: req.body.minSyc,
                  maxSyc: req.body.maxSyc,
                  min,
                  max,
                  dripfeed,
                  'refill.status': refill.status,
                  'refill.days': typeof refill.days !== 'undefined'? refill.days: '0',
                  linkDuplicates, 
                })
                .then((createService) => {
                  console.log(createService)
                  return res.status(201).json({
                    error: false,
                    status: true,
                    type: "succ",
                    message: "تم اضافة الخدمة بنجاح",
                    service: createService
                  });
                })
                .catch((e) => {
                  console.log(e)
                  return res.status(500).json({
                    status: false,
                    type: "error",
                    issues: {
                      status: true,
                      all: {
                        status: true,
                        message: "حدث خطأ ما تواصل مع المطور"
                      }
                    }
                  });
                })
              })
              .catch((e) => {
                console.log(e)
                return res.status(500).json({
                  status: false,
                  type: "error",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع المطور"
                    }
                  }
                });
              })
              
            } else {
             // console.log(indexServiceSortNow)
              db.Services.find({
                categoryId
              })
              .then((findServicesSortCategory) => {
                db.Services.create({
                  service: services.length === 0 ? 1 : services[services.length - 1].service + 1,
                  sort: services.length === 0 ? 1 : services[services.length - 1].sort + 1,
                  categoryId,
                  name,
                  providerId,
                  sortCategory: indexServiceSortNow,
                  description: typeof description !== 'undefined'?description: '',
                  'price.originalPrice': Number(price.originalPrice),
                  'price.newPrice': Number(price.newPrice),
                  minSyc: req.body.minSyc,
                  maxSyc: req.body.maxSyc,
                  serviceProviderId,
                  nameCategoryProvider: req.body.nameCategoryProvider || '',
                  addType: 'api',
                  type,
                  rate: rateObj,
                  slug: nameToSlugResponse,
                  min,
                  max,
                  dripfeed,
                  'refill.status': refill.status,
                  statusServiceProvider,
                  linkDuplicates,
                })
                .then((createService) => {
                  console.log(createService)
                  return res.status(201).json({
                    error: false,
                    status: true,
                    type: "succ",
                    message: "تم اضافة الخدمة بنجاح",
                    service: createService
                  });
                })
              .catch((e) => {
                console.log(e)
                return res.status(500).json({
                  status: false,
                  type: "error",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع المطور"
                    }
                  }
                });
              })
              })
              .catch((err) => {
                console.log(err)
                return res.status(500).json({
                  status: false,
                  type: "error",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع المطور"
                    }
                  }
                });
              })
            
            }
            /************************************ end sort services *********************************/
          }
        })
        .catch((e) => {
          console.log(e)
          return res.status(500).json({
            status: false,
            type: "error",
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع المطور"
              }
            }
          });
        })
        /********************************************************/
      }
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      type: "error",
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع المطور"
        }
      }
    });
  }
};
exports.updateService = async (req, res) => {
  try {

    //console.log(req.body)
    //return
    const issues = {
      mode: {
        status: false,
        message: ""
      },
      categoryId: {
        status: false,
        message: ""
      },
      name: {
        status: false,
        message: ""
      },
      mode: {
        status: false,
        message: ""
      },
      providerId: {
        status: false,
        message: ""
      },
      serviceId: {
        status: false,
        message: ""
      },
      type: {
        status: false,
        message: ""
      },
      rate: {
        value: {
          status: false,
          message: ""
        },
        type: {
          status: false,
          message: ""
        },
        status: {
          status: false,
          message: ""
        },
      },
      min: {
        status: false,
        message: ""
      },
      max: {
        status: false,
        message: ""
      },
      linkDuplicates: {
        status: false,
        message: ""
      },
      refill: {
        status: {
          status: false,
          message: ""
        },
      },
      dripfeed: {
        status: false,
        message: ""
      },
      price:  {
        originalPrice:  {
          status: false,
          message: ""
        },
        newPrice:  {
          status: false,
          message: ""
        },
      },
      serviceProviderId: {
        status: false,
        message: ""
      },
      statusServiceProvider: {
        status: false,
        message: ""
      },
    };
    
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
    var {
      categoryId,
      name,
      price,
      serviceProviderId,
      type,
      mode,
      providerId,
      dripfeed,
      refill,
      max,
      min,
      rate,
      linkDuplicates,
      statusServiceProvider,
      description,
      quality,
      speed,
      averageTime,
      startTime,
      guarantee,
    } = req.body;
    
    description = typeof description !== 'undefined'? description: '';
    let dataUpdateService = {
      mode: '',
      statusServiceProvider: false,
      categoryId: '',
      name: '',
      serviceProviderId: '',
      linkDuplicates: false,
      providerId: '',
      dripfeed: false,
      refill: { status: false, days: '' },
      min: '',
      max: '',
      rate: { type: 0, fixed: 0, percentage: 0 },
      type: '',
      price: { originalPrice: 0, newPrice: 0 },
      description
    }

    if (req.params.mode !== 'manual' && req.params.mode !== 'api') {
      issues.status = true;
      issues.mode.status = true;
      issues.mode.message =  "You should send mode as string 'manual' or 'api'"
    } else {
      dataUpdateService.mode = mode;
    }
    if (!categoryId) {
      issues.status = true;
      issues.categoryId.status = true;
      issues.categoryId.message = "حقل مطلوب";
    } else {
      dataUpdateService.categoryId = categoryId;
    }
    if (!name) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
    } else {
      dataUpdateService.name = name;
    }
    
    if (typeof linkDuplicates === "undefined") {
      issues.status = true;
      issues.linkDuplicates.status = true;
      issues.linkDuplicates.message = "حقل مطلوب";
    } else if(typeof JSON.parse(linkDuplicates) !== "boolean") {
      issues.status = true;
      issues.linkDuplicates.status = true;
      issues.linkDuplicates.message = "يجب أرسال false or true";
    } else {
      dataUpdateService.linkDuplicates = linkDuplicates;
    }
    if (req.body.mode === 'api') {
      if (!providerId) {
        issues.status = true;
        issues.providerId.status = true;
        issues.providerId.message = "حقل مطلوب";
      } else {
        dataUpdateService.providerId = providerId;
      }
      if (!serviceProviderId) {
        issues.status = true;
        issues.serviceProviderId.status = true;
        issues.serviceProviderId.message = "حقل مطلوب";
      } else {
        dataUpdateService.serviceProviderId = serviceProviderId;
      }
     /* console.log(serviceId)
      if (typeof serviceId !== 'undefined') {
        issues.status = true;
        issues.serviceId.status = true;
        issues.serviceId.message = "حقل مطلوب";
      } else {
        dataUpdateService.serviceId = serviceId;
      }*/
      if (typeof statusServiceProvider === "undefined") {
        issues.status = true;
        issues.statusServiceProvider.status = true;
        issues.statusServiceProvider.message = "حقل مطلوب";
      } else if(typeof JSON.parse(statusServiceProvider) !== "boolean") {
        issues.status = true;
        issues.statusServiceProvider.status = true;
        issues.statusServiceProvider.message = "يجب أرسال false or true";
      } else {
        dataUpdateService.statusServiceProvider = statusServiceProvider;
      }
    }
    if (typeof dripfeed === "undefined") {
      issues.status = true;
      issues.dripfeed.status = true;
      issues.dripfeed.message = "حقل مطلوب";
    } else if(typeof JSON.parse(dripfeed) !== "boolean") {
      issues.status = true;
      issues.dripfeed.status = true;
      issues.dripfeed.message = "يجب أرسال false or true";
  ``} else {
      dataUpdateService.dripfeed = dripfeed;
    }
    if (!refill) {
      issues.status = true;
      issues.refill.status = true;
      issues.refill.message = "حقل مطلوب";
    } else if(typeof JSON.parse(refill.status) !== "boolean") {
      issues.status = true;
      issues.refill.status.status = true;
      issues.refill.status.message = "يجب أرسال false or true";
    } else {
      dataUpdateService.refill = refill;
    }
    if (!min) {
      issues.status = true;
      issues.min.status = true;
      issues.min.message = "حقل مطلوب";
    } else {
      dataUpdateService.min = min;
    }
    if (!max) {
      issues.status = true;
      issues.max.status = true;
      issues.max.message = "حقل مطلوب";
    } else {
      dataUpdateService.max = max;
    }
    if(typeof rate === "undefined") {
      issues.status = true;
      issues.rate.status.status = true;
      issues.rate.status.message = "حقل مطلوب";
    } else if(typeof JSON.parse(rate.status) !== 'boolean'){
      issues.status = true;
      issues.rate.status.status = true;
      issues.rate.status.message = "يجب أرسال false (عندما يكون السعر ثابت) true (عندما يكون السعر نسبة مؤوية او زيادة ثابته)";
    } else if(JSON.parse(rate.status)){
      if(typeof rate.type === "undefined") {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = "حقل مطلوب";
      } else if(!rate.type) {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = "حقل مطلوب";
      } else if(typeof Number(rate.type) !== "number") {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = 'You should send type as number 1, 2 or 3'
      } else if(Number(rate.type) !== 1 && Number(rate.type) !== 2 && Number(rate.type) !== 3) {
        issues.status = true;
        issues.rate.type.status = true;
        issues.rate.type.message = 'You should send type as number 1, 2 or 3'
      } else if(Number(rate.type) === 1) {
        if(typeof rate.fixed === "undefined") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(!rate.fixed) {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(typeof Number(rate.fixed) !== "number") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = 'You should send fixed rate as number 1, 2 or 3'
        } else {
          dataUpdateService.rate.type = 1
          dataUpdateService.rate.fixed = Number(rate.fixed);
        }
      } else if(Number(rate.type) === 2) {
        if(typeof rate.percentage === "undefined") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(!rate.percentage) {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(typeof Number(rate.percentage) !== "number") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = 'You should send percentage rate as number 1, 2 or 3'
        } else {
          dataUpdateService.rate.type = 2
          dataUpdateService.rate.percentage = Number(rate.percentage);
        }
      } else if(Number(rate.type) === 3) {
        if(typeof rate.percentage === "undefined") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(!rate.percentage) {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = "حقل مطلوب";
        } else if(typeof Number(rate.percentage) !== "number") {
          issues.status = true;
          issues.rate.percentage.status = true;
          issues.rate.percentage.message = 'You should send percentage rate as number 1, 2 or 3'
        } else {
          dataUpdateService.rate.type = 3
          dataUpdateService.rate.percentage = Number(rate.percentage);
        }
        if(typeof rate.fixed === "undefined") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(!rate.fixed) {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = "حقل مطلوب";
        } else if(typeof Number(rate.fixed) !== "number") {
          issues.status = true;
          issues.rate.fixed.status = true;
          issues.rate.fixed.message = 'You should send fixed rate as number 1, 2 or 3'
        } else {
          dataUpdateService.rate.type = 3
          dataUpdateService.rate.fixed = Number(rate.fixed);
        }
      }
    } else {
      rate.status = false
    }
    if (!type) {
      issues.status = true;
      issues.type.status = true;
      issues.type.message = "حقل مطلوب";
    } else {
      dataUpdateService.type = type;
    }
    if (!price) {
      issues.status = true;
      issues.price.originalPrice.status = true;
      issues.price.originalPrice.message = "حقل مطلوب";
      issues.status = true;
      issues.price.newPrice.status = true;
      issues.price.newPrice.message = "حقل مطلوب";
    } else {
      if(!price.originalPrice) {
        issues.status = true;
        issues.price.originalPrice.status = true;
        issues.price.originalPrice.message = "حقل مطلوب";
      } else {
        dataUpdateService.price.originalPrice = Number(price.originalPrice);
      }
      if(!price.newPrice) {
        issues.status = true;
        issues.price.newPrice.status = true;
        issues.price.newPrice.message = "حقل مطلوب";
      } else {
        dataUpdateService.price.newPrice = Number(price.newPrice);
      }
    }
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues
      });
    }
    if(startTime !== "undefined" || !startTime) {
      dataUpdateService.startTime = startTime;
    }
    if(guarantee !== "undefined" || !guarantee) {
      dataUpdateService.guarantee = guarantee;
    }
    if(averageTime !== "undefined" || !averageTime) {
      dataUpdateService.averageTime = averageTime;
    }
    if(speed !== "undefined" || !speed) {
      dataUpdateService.speed = speed;
    }
    if(quality !== "undefined" || !quality) {
      dataUpdateService.quality = quality;
    }
    var nameToSlugResponse = await nameToSlug(req.body.name);
    dataUpdateService.minSyc = JSON.parse(req.body.minSyc);
    dataUpdateService.maxSyc = JSON.parse(req.body.maxSyc);
    dataUpdateService.slug = nameToSlugResponse
    await db.Services.findOneAndUpdate({ _id: req.params.serviceId }, dataUpdateService, { new: false }, (err, updateService) => {
      if (err || !updateService) {
        return res.status(400).json({
          status: false,
          type: "updateService",
          issues: {
            status: true,
            all: {
              status: true,
              message: "حدث خطا ما تواصل مع الدعم الفني"
            }
          }
        });
      }
      return res.status(200).json({
        error: false,
        status: true,
        type: "succ",
        message: "تم تعديل الخدمة بنجاح",
        service: updateService,
      });
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: false,
      type: "site",
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
exports.deleteService = async (req, res) => {
  try {
    await db.Services.deleteOne({ _id: req.params.serviceId });
    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم الحذف بنجاح"
    });
  } catch (err) {
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
};
exports.viewService = async (req, res) => {
  try {
    await db.Services.findOne({ _id: req.params.serviceId })
    .then((service) => {
      console.log(service)
      if(!service) {
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
      } else {
        return res.status(200).json({
          error: false,
          status: true,
          type: "succ",
          service,
        });
      }
      
    })
    .catch((err) => {
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
    })
    
  } catch (err) {
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
};
exports.disableService = async (req, res) => {
  try {
    const issues = {
      status: false,
      statusService: {
        status: false,
        message: ""
      },
    };

    const {
      status,
    } = req.body;
    if(typeof status === 'undefined') {
      issues.status = true;
      issues.statusService.status = true;
      issues.statusService.message = "حقل مطلوب";
    } else if(typeof status !== 'boolean' && typeof JSON.parse(status) !== "boolean"){
      issues.status = true;
      issues.statusService.status = true;
      issues.statusService.message = 'You should send status service as boolean value true or false'
    }

    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    await db.Services.findOne({ _id: req.params.serviceId })
    .then(async (service) => {
      if(!service) {
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
      } else {
        service.status = JSON.parse(status);
        await service.save();
        return res.status(200).json({
          error: false,
          status: true,
          type: "succ",
          service,
        });
      }
      
    })
    .catch((err) => {
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
    })
    
  } catch (err) {
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
};
exports.updateSortService = async (req, res) => {
  try {
    await db.Services.findOne({ _id: req.params.firstServiceId })
    .then(async (firstService) => {
      console.log(firstService)
      if(!firstService) {
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
      } else {
        // service.status = JSON.parse(status);
        /*****************************/

        await db.Services.findOne({ _id: req.params.secondServiceId })
        .then(async (secondService) => {
          if(!secondService) {
            // console.log(secondService)
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
          } else {
            var secondServiceSort = secondService.sortCategory
            secondService.sortCategory = firstService.sortCategory;
            firstService.sortCategory = secondServiceSort;
            await firstService.save();
            await secondService.save();
            return res.status(200).json({
              error: false,
              status: true,
              type: "succ",
            });
          }
        })
        .catch((err) => {
          console.log(err)
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
        })


        /****************************/
      }
      
    })
    .catch((err) => {
      console.log(err)
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
    })
    
  } catch (e) {
    console.log('err')
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
};
exports.copyService = async (req, res) => {
  try {
    await db.Services.findOne({
      _id: req.params.serviceId,
    })
    .then((service) => {
      db.Services.find({})
      .then((findServices) => {
        findServices.sort(function(a, b){return a.sort - b.sort});
        db.Services.create({
          service: findServices[findServices.length - 1].service + 1,
          sort: findServices[findServices.length - 1].sort + 1,
          sortCategory: service.sortCategory,
          categoryId: service.categoryId,
          name: service.name,
          description: typeof service.description !== 'undefined'?service.description: '',
          price: service.price,
          addType: service.addType,
          type: service.addType,
          slug: service.slug,
          rate: service.rate,
          nameCategoryProvider: service.nameCategoryProvider || '',
          minSyc: service.minSyc,
          maxSyc: service.maxSyc,
          serviceProviderId: service.serviceProviderId,
          nameCategoryProvider: service.nameCategoryProvider,
          providerId: service.providerId,
          fullRate: service.fullRate,
          rating: service.rating,
          executionTime: service.executionTime,
          startTime: service.startTime,
          speed: service.speed,
          averageTime: service.averageTime,
          guarantee: service.guarantee,
          quality: service.quality,
          average_time: service.average_time,
          total_votes: service.total_votes,
          start_time: service.start_time,
          note: service.note,
          example_link: service.example_link,
          statusServiceProvider: service.statusServiceProvider,
          min: service.min,
          max: service.max,
          dripfeed: service.dripfeed,
          refill: service.refill,
          linkDuplicates: service.linkDuplicates, 
          status: service.status, 
        })
        .then((newService) => {
          return res.status(200).json({ 
            status: true, 
            service: newService
          });
        })
        .catch((e) => {
          return res.status(500).json({
            status: false,
            type: "New Service",
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
        console.log(e)
        return res.status(500).json({
          status: false,
          type: "Find Services",
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
      return res.status(500).json({
        status: false,
        type: "Find Service",
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })
    /*.deleteOne({ _id: req.params.serviceId });
    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم الحذف بنجاح"
    });*/
  } catch (err) {
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
};
