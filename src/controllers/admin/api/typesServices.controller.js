const db = require('../../../models/index');

exports.createTypeServices = async (req, res) => {
    try {
      
        const issues = {
            status: false,
            name: {
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
        } = req.body;
        if (!name) {
            issues.status = true;
            issues.name.status = true;
            issues.name.message = "حقل مطلوب";
        }
        if (issues.status) {
            return res.status(400).json({
              status: false,
              type: "required",
              issues
            });
          }
        db.TypesServices.find({}, async (err, typesServices) => {
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
            db.TypesServices.create({
                id: typesServices.length === 0? 1 : typesServices[typesServices.length - 1].id + 1,
                name,
            })
            .then((typesService) => {
                return res.status(200).json({
                    status: true,
                    type: "succ",
                    typesService
                });
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
}

exports.updateTypeServices = async (req, res) => {
    try {
        const issues = {
            status: false,
            name: {
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
        } = req.body;
        if (!name) {
            issues.status = true;
            issues.name.status = true;
            issues.name.message = "حقل مطلوب";
        }
        if (issues.status) {
            return res.status(400).json({
              status: false,
              type: "required",
              issues
            });
          }
        await db.TypesServices.findOne({ _id: req.params.typeServicesId }, async (err, typesService) => {
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
            else if(!typesService) {
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
            typesService.name = req.body.name;
            await typesService.save();
            return res.status(200).json({
              status: true,
              type: "succ",
              typesService,
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

exports.deleteTypeServices = async (req, res) => {
  try {
    await db.TypesServices.deleteOne({ _id: req.params.typeServicesId });
    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم الحذف بنجاح"
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

exports.viewsTypeServices = async (req, res) => {
  try {
    await db.TypesServices.find({})
    .then((typesServices) => {
      return res.status(200).json({
        error: false,
        status: true,
        type: "succ",
        typesServices,
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
