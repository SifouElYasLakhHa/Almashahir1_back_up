const db = require("../../../models/index");
const {
  nameToSlug,
} = require('../../../utils/auth');

exports.viewsServicesCategory = async (req, res) => {
  try {
    var query = {}
    query.categoryId = req.params.categoryId;
    if(req.user.role !== 1) {
      query.status = true;
    }
    db.Services.find(query)
    .select('service categoryId name slug sortCategory sort description price.newPrice addType status type fullRate rating min executionTime startTime speed averageTime guarantee quality max dripfeed average_time total_votes start_time note example_link refill linkDuplicates createAt')
    .then((services) => {
      services.sort(function(a, b){return a.sortCategory - b.sortCategory});

      return res.status(200).json({
        status: true,
        services
      })
    })
    .catch((e) => {
      return res.status(500).json({
        status: false,
        type: "Find Services of category",
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
    console.log(e)
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

exports.viewsServicesCategoryException = async (req, res) => {
  try {
    db.Services.find({ 
      categoryId: req.params.categoryId,
      _id: { $ne: req.params.serviceId },
    })
    .then((services) => {
      services.sort(function(a, b){return a.sortCategory - b.sortCategory});
      return res.status(200).json({
        status: true,
        services
      })
    })
    .catch((e) => {
      return res.status(500).json({
        status: false,
        type: "Find Services of category",
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
    console.log(e)
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
exports.updateSortCategory = async (req, res) => {
  try {
    console.log('Hi');
    await db.Categories.findOne({ _id: req.params.firstCategoryId })
    .then(async (firstCategory) => {
      console.log(firstCategory)
      if(!firstCategory) {
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
        await db.Categories.findOne({ _id: req.params.secondCategoryId })
        .then(async (secondCategory) => {
          if(!secondCategory) {
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
            var secondCategorySort = secondCategory.sort
            secondCategory.sort = firstCategory.sort;
            firstCategory.sort = secondCategorySort;
            await firstCategory.save();
            await secondCategory.save();
            return res.status(200).json({
              error: false,
              status: true,
              type: "succ",
            });
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
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          });
        })
        /****************************/
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
exports.viewsCategoryException = async (req, res) => {
  try {
    db.Categories.find({ 
      _id: { $ne: req.params.categoryId },
    })
    .then((categories) => {
      categories.sort(function(a, b){return a.sort - b.sort});
      return res.status(200).json({
        status: true,
        categories
      })
    })
    .catch((e) => {
      return res.status(500).json({
        status: false,
        type: "Find Services of category",
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
    console.log(e)
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
exports.createCategory = async (req, res) => {
  try {
    const issues = {
      status: false,
      all: {
        status: false,
        message: '',
      },
      name: {
        status: false,
        message: '',
      },
      sort: {
        status: false,
        message: '',
      },
    };

    if (Object.keys(req.body).length === 0) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
      return res.status(400).json({
        status: false,
        type: "error",
        issues,
      });
    }
    const { name, description, sort } = req.body;
    if (!name) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
    }
    var nameToSlugResponse = await nameToSlug(name);//.then((rs) => rs);
  //  console.log(nameToSlugResponse)
    
  /*  switch(sort) {
      case !'top': {
        issues.status = true;
        issues.sort.status = true;
        issues.sort.message = "يجب ان اكون top او buttom";
        //console.log('top')
        break;
      }
      case !'buttom': {
        issues.status = true;
        issues.sort.status = true;
        issues.sort.message = "يجب ان اكون top او buttom";
       // console.log('buttom')
        break;
      }
      default: {
        //console.log('sort')
      }
    }*/
    if(sort !== 'top' && sort !== 'buttom') {
      issues.status = true;
      issues.sort.status = true;
      issues.sort.message = "يجب ان اكون top او buttom";
    }
    
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    var nameToSlugResponse = await nameToSlug(req.body.name);
    db.Categories.find({})
    .then(async (categories) => {
      if(categories.length === 0) {
        const category = await  db.Categories.create({
          category: 1,
          name: req.body.name,
          slug: nameToSlugResponse,
          description: typeof req.body.description !== 'undefined'? req.body.description: '',
          sort: 1
        });
        await category.save();
      } else {
        if(sort === 'top') {
        //  var categoriesArr = []
        var newCategory = ''
          categories.forEach(async function (value, i) {
            await db.Categories.findOneAndUpdate({ _id: value._id }, {
              sort: value.sort + 1,
            }, {
              new: true
            }, (err, updateCategory) => {
              console.log()
              if(err || !updateCategory) {
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
            });

           /* if(categories.length === i) {
              
            } else {
              
            }*/
          });
          const category = await  db.Categories.create({
            category: categories.length === 0? 1: categories[categories.length - 1].category + 1,
            name: req.body.name,
            description: typeof req.body.description !== 'undefined'? req.body.description: '',
            slug: nameToSlugResponse,
            sort: 1
          });
          await category.save();
        } else {
          const category = await  db.Categories.create({
            category: categories.length === 0? 1: categories[categories.length - 1].category + 1,
            name: req.body.name,
            description: typeof req.body.description !== 'undefined'? req.body.description: '',
            slug: nameToSlugResponse,
            sort: categories.length === 0? 1: categories[categories.length - 1].sort + 1,
          });
          await category.save();
        }
      }
      
      return res.status(200).json({
        error: false,
        status: true,
        type: "succ",
        message: "تم اضافة القسم بنجاح"
      });
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
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const issues = {
      status: false,
      all: {
        status: false,
        message: '',
      },
      name: {
        status: false,
        message: '',
      },
      description: {
        status: false,
        message: '',
      },
      sort: {
        status: false,
        message: '',
      },
      statusShowHide: {
        status: false,
        message: '',
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

    const { name, description, statusShowHide } = req.body; //, sort
    if (!name) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
    }
    /*  if (!sort) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "حقل مطلوب";
    } else if(typeof Number(sort) !== 'number') {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "يجب ارسال رقم";
    } else if(Number(sort) < 1) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "يجب ارسال رقم أكبر من 0";
    }*/
    if (typeof statusShowHide === "undefined") {
      issues.status = true;
      issues.status.status = true;
      issues.status.message = "حقل مطلوب";
    } else if(typeof JSON.parse(statusShowHide) !== "boolean"){
      issues.status = true;
      issues.statusShowHide.status = true;
      issues.statusShowHide.message = "يجب أرسال false or true";
    }
    
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
  var nameToSlugResponse = await nameToSlug(req.body.name);
  await db.Categories.findOneAndUpdate({ _id: req.params.categoryId }, {
    description: typeof description !== 'undefined'? description: '',
    status: JSON.parse(statusShowHide),
    name: req.body.name,
    slug: nameToSlugResponse,
  }, {
    new: false,
  }, (err, updateCategory) => {
    if(err) {
      console.log(err)
      return res.status(400).json({
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
    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم التعديل بنجاح"
    });
   /* if(!updateCategory) {
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
      if(updateCategory.sort === Number(sort)) {
        return res.status(200).json({
          error: false,
          status: true,
          type: "succ",
          message: "تم التعديل بنجاح"
        });
      } else {
        db.Categories.findOne({
          sort
        })
        .then(async (findCategory) => {
          if(!findCategory) {
            updateCategory.sort = sort;
            await updateCategory.save();
          } else {
            findCategory.sort = updateCategory.sort;
            await findCategory.save();
            updateCategory.sort = sort;
            await updateCategory.save();
            return res.status(200).json({
              error: false,
              status: true,
              type: "succ",
              message: "تم التعديل بنجاح"
            });
          }
        })
        .catch((e) => {
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
    }*/
    
  });
  } catch (e) {
    //console.log(err)
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
exports.deleteCategory = async (req, res) => {
  try {
  /*  db.Services.find({})
    .then((services) => {
      console.log()
    })
    .catch((err) => {

    })
    */
    await db.Categories.deleteOne({ _id: req.params.categoryId });
    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم حذف القسم بنجاح"
    });
  } catch (err) {
    //console.log(err)
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
exports.viewCategory = async (req, res) => {
  try {
    db.Categories.findOne({ _id: req.params.categoryId }, (err, category) => {
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
      if(!category) {
        return res.status(500).json({
          error: true,
          status: false,
          type: "error",
          message: "لم يتم العثور على الخدمة"
        });
      }
      return res.status(500).json({
        status: true,
        type: "succ",
        category,
      });

    })
  } catch(err) {
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
exports.viewsCategories = async (req, res) => {
  try {
    var query = {}
    if(req.user.role !== 1) {
      query.status = true;
    }
    db.Categories.find(query, (e, categories) => {
      if(e) {
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
      categories.sort(function(a, b){return a.sort - b.sort});
      return res.status(200).json({
        status: true,
        type: "succ",
        categories,
      });
    })
  } catch(e) {
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
exports.disableCategory = async (req, res) => {
  try {
    const issues = {
      status: false,
      statusCategory: {
        status: false,
        message: ""
      },
    };

    const {
      status,
    } = req.body;
    if(typeof status === 'undefined') {
      issues.status = true;
      issues.statusCategory.status = true;
      issues.statusCategory.message = "حقل مطلوب";
    } else if(typeof status !== 'boolean'){
      issues.status = true;
      issues.statusCategory.status = true;
      issues.statusCategory.message = 'You should send status category as boolean value true or false'
    }

    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    await db.Categories.findOne({ _id: req.params.categoryId })
    .then(async (category) => {
      if(!category) {
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
        category.status = status;
        await category.save();
        return res.status(200).json({
          error: false,
          status: true,
          type: "succ",
          category,
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