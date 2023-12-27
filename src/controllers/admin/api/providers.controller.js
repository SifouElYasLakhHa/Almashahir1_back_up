const db = require('../../../models/index');
const { 
    isUrlValid,
    getServicesProvider,
    getServicesProviderAll,
    nameToSlug,
   } = require("../../../utils/auth");

exports.createProvider = async (req, res) => {
    try {
        const issues = {
            status: false,
            key: {
              status: false,
              message: ""
            },
            linkApi: {
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
            name,
            key,
            linkApi,
            description,
        } = req.body;
        if (!key) {
            issues.status = true;
            issues.name.status = true;
            issues.name.message = "حقل مطلوب";
        }
        if (!linkApi) {
            issues.status = true;
            issues.name.status = true;
            issues.name.message = "حقل مطلوب";
        } else if(!isUrlValid(linkApi)) {
            issues.status = true;
            issues.name.status = true;
            issues.name.message = "أدخل رابط صالح";
        }
        if (issues.status) {
            return res.status(400).json({
              status: false,
              type: "required",
              issues
            });
          }
        await db.Providers.findOne({ linkApi }, async (err, provider) => {
          if(err) {
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
          if(!provider) {
            await db.Providers.find({}, async (err, providers) => {
              if(err) {
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
    
              db.Providers.create({
                provider: providers.length === 0? 1 : providers[providers.length - 1].provider + 1,
                name: typeof name !== 'undefined'? name:'',
                key,
                linkApi,
                description: typeof description !== 'undefined'? description:'',
              })
              .then((provider) => {
                return res.status(200).json({
                    status: true,
                    type: "succ",
                    provider
                });
              })
              .catch((err) => {
                //////console.log(err)
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
              });
            })
          } else {
            return res.status(500).json({
              status: false,
              type: "exist",
              issues: {
                status: true,
                all: {
                  status: true,
                  message: "هذا الموزع موجود بالفعل"
                }
              }
            });
          }
        })
    } catch (err) {
        ////console.log(err)
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
}
exports.viewsProvider = async (req, res) => {
  try {
    await db.Providers.find({})
    .select('status _id id name linkApi description')
    .then((providers) => {
      return res.status(200).json({
        status: true,
        type: "succ",
        providers,
      });
    })
    .catch((err) => {
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
    })

  } catch (err) {
    ////console.log(err)
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
}
exports.viewServicesProvider = async (req, res) => {
  try {  
    db.Providers.findOne({ _id: req.params.providerId })
    .then(async (provider) => {
     
      if(!provider) {
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
      var services = await getServicesProvider({
        url: provider.linkApi,
        key: provider.key,
        action: 'services'
       }).then((rs) => rs)
       //////console.log(services.status)
       if(services.status === false) {
        return res.status(500).json({
          status: false,
          type: "site",
          issues: {
            status: true,
            all: {
              status: true,
              message: services.error
            }
          }
        });
       } else {
        return res.status(200).json({
          status: true,
          type: "succ",
          services:  services.services
        });
       }
    })
    .catch((err) => {
      //////console.log(err)
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
    })
    
  } catch (err) {
    //////console.log(err)
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
}
exports.updateProvider = async (req, res) => {
  try {
    const issues = {
      status: false,
      name: {
        status: false,
        message: ""
      },
      key: {
        status: false,
        message: ""
      },
      linkApi: {
        status: false,
        message: ""
      },
      statusProvider: {
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
      name,
      key,
      linkApi,
      description,
  } = req.body;
  //////console.log(!key)
  
  if (!key) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
  }
  
  if (!linkApi) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
  } else if(!isUrlValid(linkApi)) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "أدخل رابط صالح";
  }
  if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues
      });
    }

    if (issues.status) {
        return res.status(400).json({
          status: false,
          type: "required",
          issues
        });
      }
    await db.Providers.findOne({ _id: req.params.providerId }, async (err, provider) => {
        if(err) {
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
        else if(!provider) {
          return res.status(500).json({
            status: false,
            type: "find",
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          });
        }
        provider.name = typeof name !== 'undefined'? name:'';
        provider.key = key;
        provider.linkApi = linkApi;
        provider.description = typeof description !== 'undefined'? description:'';

        await provider.save();
        return res.status(200).json({
          status: true,
          type: "succ",
          provider,
          message: 'تم تحديث بنجاح'
      });
    })
      
  } catch (err) {
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
}
exports.deleteProvider = async (req, res) => {
  try {
    await db.Providers.deleteOne({ _id: req.params.providerId });
    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم الحذف بنجاح"
    });
  } catch (err) {
    //////console.log(err)
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
exports.viewServicesProviderAll = (req, res) => {
  try {
    db.Providers.findOne({
      _id: req.params.providerId
    })
    .then(async (findProvider) => {
      if(!findProvider) {
        return res.status(500).json({
          status: false,
          type: "findProviders",
          issues: {
            status: true,
            all: {
              status: true,
              message: "حدث خطأ ما تواصل مع الدعم الفني"
            }
          }
        });
      } else {
        var responseGetServicesProvider = await getServicesProvider({
          url: findProvider.linkApi,
          key: findProvider.key,
          action: 'services',
        }).then((rs) => rs.services);
        if(responseGetServicesProvider.length === 0) {
          return res.status(500).json({
            status: false,
            type: "findProvider",
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          })
        } else {
         // //console.log('/*********************************************/');
          db.Services.find({
            providerId: findProvider._id
          })
          .populate('categoryId')
          .then(async (findServicesProvider) => {
            var array1 = [];
            var array2 = []; // store 
            var array3 = [];
            var array4 = [];
            // console.log(findServicesProvider.length === 0)
            if(findServicesProvider.length === 0) {
              let categoryArray = [];
              var categoryName = responseGetServicesProvider[0].category;
              /*************************/
              for(var s of responseGetServicesProvider) {
                if(s.category === categoryName) {
                 if(s.type !== 'Subscriptions') {
                  array1.push({
                    service: s.service,
                    name: s.name,
                    type: s.type,
                    rate: s.rate,
                    min: s.min,
                    max: s.max,
                    refill: s.refill,
                    dripfeed: s.dripfeed,
                    cancel: s.cancel,
                    exist: false,
                  })
                 }
                } else {
                  //console.log(findServicesProvider)
                  array2.push({
                    category: {
                      _id: 'false',
                      name: categoryName,
                      services: array1
                    }
                  })
                  array1 = [];
                  categoryName = s.category;
                }
              }
              /*************************/
              return res.status(200).json({
                status: true,
                categories: array2,
              });
            } else {
              var existValidation = false;
              for(var s of responseGetServicesProvider) {
                for(var sp of findServicesProvider) {
                  if(Number(s.service) === Number(sp.serviceProviderId)) {
                    existValidation = true;
                  }
                }
                if(!existValidation) {
                  if(s.type !== 'Subscriptions') {
                    array1.push({
                      service: s.service,
                      name: s.name,
                      type: s.type,
                      rate: s.rate,
                      min: s.min,
                      max: s.max,
                      refill: s.refill,
                      dripfeed: s.dripfeed,
                      cancel: s.cancel,
                      exist: false,
                    })
                  }
                } 
              }

              array2 = [];
              let categoryArray = [];
              var categoryName = responseGetServicesProvider[0].category;
              var categoryId = responseGetServicesProvider[0]._id;
              /************************ */
              for(var s of responseGetServicesProvider) {
                if(s.type === 'Package' || s.type === 'Custom Comments Package' || s.type === 'Custom Comments' || s.type === 'Poll' || s.type === 'Default') { //'Subscriptions'
                  if(s.category === categoryName) {
                     array2.push({
                       service: s.service,
                       name: s.name,
                       type: s.type,
                       rate: s.rate,
                       min: s.min,
                       max: s.max,
                       dripfeed: s.dripfeed,
                       refill: s.refill,
                       cancel: s.cancel,
                       exist: false,
                     })
                   } else {
                     array3.push({
                       category: {
                         _id: 'false',
                         name: categoryName,
                         services: array2
                       }
                     })
                     array2 = [];
                     categoryName = s.category;
                     categoryId = s._id;
                   }
                }
              }
              // array3 all services not exist and ready for return.
              existValidation = false;
              for(var s = 0; s < array3.length; s++) {
                for(var sp of findServicesProvider) {
                  if(array3[s].category.name === sp.nameCategoryProvider) {
                    var sortSortExistServices = await getServicesProviderAll({
                      providerId: sp.providerId,
                    }, {
                      categoryId: sp.categoryId,
                    }).then((rs) => rs.services);
                    array4 = array3[s].category.services;
                    array3[s].category.services = [];
                    for(var ar of sortSortExistServices) {
                      array3[s].category._id = sp.categoryId._id;
                      array3[s].category.services.push({
                        service: ar.service,
                        name: ar.name,
                        type: ar.type,
                        rate: ar.price.newPrice,
                        min: ar.min,
                        max: ar.max,
                        refill: ar.refill,
                        dripfeed: ar.dripfeed,
                        cancel: ar.cancel,
                        exist: true,
                      });
                    }
                    /*for(var ar of array4) {
                      array3[s].category.services.push({
                        service: ar.service,
                        name: ar.name,
                        type: ar.type,
                        rate: ar.rate,
                        min: ar.min,
                        max: ar.max,
                        refill: ar.refill,
                        dripfeed: ar.dripfeed,
                        cancel: ar.cancel,
                        exist: false,
                      });
                    }*/
                    //
                    break;
                  }
                }
              }
              /************************ */
            }
            return res.status(200).json({
              status: true,
              categories: array3,
            });
            // array1 have not exist services
          })
          .catch((e) => {
            //console.log(e)
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
        }
      }
    })
    .catch((e) => {
      //console.log(e)
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
    //console.log(e)
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

}
exports.importAllServicesProvider = async (req, res) => {
  try {
    if(Number(req.body.typeImport) === 1) {
      var nameToSlugResponse = await nameToSlug(req.body.categoryName);
      var index = 1;
      if(req.body.categoryId === 'false') {
        db.Categories.find({})
        .then((findCategories) => {
          db.Categories.create({
            slug: nameToSlugResponse,
            name: req.body.categoryName,
            category: findCategories.length !== 0? findCategories[findCategories.length - 1].category + 1:1,
            sort: findCategories.length !== 0? findCategories[findCategories.length - 1].sort + 1:1,
          })
          .then((createCategory) => {
            db.Services.find({})
            .then((findServices) => {
              for(var s of req.body.services) {
                db.Services.create({
                  service: findServices.length === 0 ? 1 : findServices[findServices.length - 1].service + index,
                  sort: findServices.length === 0 ? 1 : findServices[findServices.length - 1].sort + index,
                  categoryId: createCategory._id,
                  sortCategory: index + 1,
                  name: s.name,
                  description: '',
                  serviceProviderId: s.serviceProviderId,
                  'price.originalPrice': Number(s.priceOrigin),
                  'price.newPrice': Number(Number(s.price).toFixed(2)),
                  addType: 'api',
                  type: s.type,
                  slug: nameToSlugResponse,
                  rate: req.body.rate,
                  providerId: req.params.providerId,
                  nameCategoryProvider: req.body.categoryName,
                  minSyc: s.minSyc || true,
                  maxSyc: s.maxSyc || true,
                  min: s.min,
                  max: s.max,
                  dripfeed: s.dripfeed,
                  refill: s.refill,
                  linkDuplicates: s.linkDuplicates, 
                })
                .then((createService) => {
                  console.log(createService)
                })
                .catch((e) => {
                  //console.log(e)
                  return res.status(500).json({
                    status: false,
                    type: "createService",
                    issues: {
                      status: true,
                      all: {
                        status: true,
                        message: "حدث خطأ ما تواصل مع الدعم الفني"
                      }
                    }
                  });
                })
                index++;
              }
            })
            .catch((e) => {
              //console.log(e);
              return res.status(500).json({
                status: false,
                type: "findServices",
                issues: {
                  status: true,
                  all: {
                    status: true,
                    message: "حدث خطأ ما تواصل مع الدعم الفني"
                  }
                }
              });
            })
            //return res.status(200).json({ status: true });
          })
          .catch((e) => {
            return res.status(500).json({
              status: false,
              type: "createCategory",
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
            type: "findCategories",
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          });
        })
      } else {
        db.Services.find({})
        .then((findServices) => {
          for(var s of req.body.services) {
            db.Services.create({
              service: findServices.length === 0 ? 1 : findServices[findServices.length - 1].service + 1 + index,
              sort: findServices.length === 0 ? 1 : findServices[findServices.length - 1].sort + 1 + index,
              categoryId: req.body.categoryId,
              sortCategory: index + 1,
              name: s.name,
              description: '',
              serviceProviderId: s.serviceProviderId,
              'price.originalPrice': Number(s.priceOrigin),
              'price.newPrice': Number(Number(s.price).toFixed(2)),
              addType: 'api',
              type: s.type,
              slug: nameToSlugResponse,
              providerId: req.params.providerId,
              rate: req.body.rate,
              nameCategoryProvider: req.body.categoryName,
              minSyc: s.minSyc || true,
              maxSyc: s.maxSyc || true,
              min: s.min,
              max: s.max,
              dripfeed: s.dripfeed,
              refill: s.refill,
              linkDuplicates: s.linkDuplicates, 
            })
            .then((createService) => {
              //console.log('/****************************/')
              //console.log(createService)
            })
            .catch((e) => {
              //console.log(e)
              return res.status(500).json({
                status: false,
                type: "createService",
                issues: {
                  status: true,
                  all: {
                    status: true,
                    message: "حدث خطأ ما تواصل مع الدعم الفني"
                  }
                }
              });
            })
            index++;
          }
        })
        .catch((e) => {
          //console.log(e);
          return res.status(500).json({
            status: false,
            type: "findServices",
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          });
        })
      }
      return res.status(200).json({ status: true });
    } else if(Number(req.body.typeImport) === 2) {
      await db.Categories.find({})
      .then(async (findCategories) => {
        /*************************************** */
        await db.Services.find({})
        .then(async (findServices) => {
          var indexCategory = 0;
          console.log(indexCategory)
          ///  var indexServicesSort = 1;
          for(var c of req.body.categories) {
            indexCategory++;
            var nameToSlugResponse = await nameToSlug(c.categoryName);
            if(c.categoryId === 'false') {
              var indexServicesSort = 1;
              //var sortServicesArray = findServices.sort(function(a, b){return a.sortCategory - b.sortCategory});
              await db.Categories.create({
                slug: nameToSlugResponse,
                name: c.categoryName,
                category: findCategories.length === 0? indexCategory:findCategories[findCategories.length - 1].category + indexCategory,
                sort: findCategories.length === 0? indexCategory:findCategories[findCategories.length - 1].sort + indexCategory,
              })
              .then(async (createCategory) => {
                await db.Services.find({})
                .then(async (findServices) => {
                  for(var s of c.services) {
                    await db.Services.create({
                      service: findServices.length === 0 ? indexServicesSort: findServices[findServices.length - 1].service + indexServicesSort,
                      sort: findServices.length === 0 ? indexServicesSort: findServices[findServices.length - 1].sort + indexServicesSort,
                      categoryId: createCategory._id,
                      sortCategory: indexServicesSort,
                      name: s.name,
                      description: '',
                      serviceProviderId: s.serviceProviderId,
                      'price.originalPrice': Number(s.priceOrigin),
                      'price.newPrice': Number(Number(s.price).toFixed(2)),
                      addType: 'api',
                      providerId: req.params.providerId,
                      type: s.type,
                      slug: nameToSlugResponse,
                      rate: req.body.rate,
                      nameCategoryProvider: c.categoryName,
                      minSyc: s.minSyc || true,
                      maxSyc: s.maxSyc || true,
                      min: s.min,
                      max: s.max,
                      dripfeed: s.dripfeed,
                      'refill.type': s.type,
                      'refill.status': typeof s.status === 'undefined'? false: (typeof s.status === 'false'? false:true),
                      linkDuplicates: s.linkDuplicates || false, 
                    })
                    .then((createService) => {
                    })
                    .catch((e) => {
                      //console.log(e)
                      return res.status(500).json({
                        status: false,
                        type: "createService",
                        issues: {
                          status: true,
                          all: {
                            status: true,
                            message: "حدث خطأ ما تواصل مع الدعم الفني"
                          }
                        }
                      });
                    })
                    indexServicesSort++;
                  }
                })
                .catch((e) => {
                  //console.log(e);
                  return res.status(500).json({
                    status: false,
                    type: "findServices",
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
                  type: "createCategory",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع الدعم الفني"
                    }
                  }
                });
              })

            } else {
              var indexServicesSort = 1;
              await  db.Services.find({
                categoryId: c.categoryId
              })
              .then(async (getAllServicesCategory) => {
                var sortServicesArray = getAllServicesCategory.sort(function(a, b){return a.sortCategory - b.sortCategory});
                for(var s of c.services) {
                  await db.Services.create({
                    service: findServices.length === 0 ? 1:findServices[findServices.length - 1].service + indexServicesSort,
                    sort: findServices.length === 0 ? 1:findServices[findServices.length - 1].sort + indexServicesSort,
                    categoryId: c.categoryId,
                    sortCategory: sortServicesArray.length === 0? indexServicesSort:sortServicesArray[sortServicesArray.length - 1].sortCategory + indexServicesSort,
                    name: s.name,
                    description: '',
                    serviceProviderId: s.serviceProviderId,
                    'price.originalPrice': Number(s.priceOrigin),
                    'price.newPrice': Number(Number(s.price).toFixed(2)),
                    addType: 'api',
                    providerId: req.params.providerId,
                    type: s.type,
                    slug: nameToSlugResponse,
                    rate: req.body.rate,
                    nameCategoryProvider: c.categoryName,
                    minSyc: s.minSyc || true,
                    maxSyc: s.maxSyc || true,
                    min: s.min,
                    max: s.max,
                    dripfeed: s.dripfeed,
                    'refill.type': s.type,
                    'refill.status': typeof s.status === 'undefined'? false: (typeof s.status === 'false'? false:true),
                    linkDuplicates: s.linkDuplicates, 
                  })
                  .then((createService) => {
                  })
                  .catch((e) => {
                    //console.log(e)
                    return res.status(500).json({
                      status: false,
                      type: "createService",
                      issues: {
                        status: true,
                        all: {
                          status: true,
                          message: "حدث خطأ ما تواصل مع الدعم الفني"
                        }
                      }
                    });
                  })
                  indexServicesSort++;
                }
              })
              .catch((e) => {
                return res.status(500).json({
                  status: false,
                  type: "getAllServicesCategory",
                  issues: {
                    status: true,
                    all: {
                      status: true,
                      message: "حدث خطأ ما تواصل مع الدعم الفني"
                    }
                  }
                });
              })
              
            }
           // indexCategory++;
          }
        })
        .catch((e) => {
          //console.log(e);
          return res.status(500).json({
            status: false,
            type: "findServices",
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          });
        })
        // return res.status(200).json({ status: true });
        /*************************************** */
      })
      .catch((e) => {
        return res.status(500).json({
          status: false,
          type: "findCategories",
          issues: {
            status: true,
            all: {
              status: true,
              message: "حدث خطأ ما تواصل مع الدعم الفني"
            }
          }
        });
      })
    } else {
      return res.status(500).json({
        status: false,
        type: "typeImport",
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    }
    return res.status(200).json({ status: true });
  } catch (e) {
    ////console.log(e);
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
}