const db = require('../../../models/index');
const EmailValidator = require('email-validator');


const {
  generateAuthToken,
  validationUserIfExist,
  validationUserUpdateIfExist,
  hashPasswordUser,
  removeZeroPhone,
} = require('../../../utils/auth');

require('dotenv').config();

exports.manageUsersPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
    } : false;

    return res.render('pages/manageUsers', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ادارة المستخدمين',
      user,
    });
  } catch (error) {
    //  console.log(error)
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

exports.createUser = async (req, res) => {
    try {
      const issues = {
        status: false,
        all: {
          status: false,
          message: '',
        },
        username: {
          status: false,
          message: '',
        },
        email: {
          status: false,
          message: '',
        },
        password: {
          status: false,
          message: '',
        },
      };
  
      if (Object.keys(req.body).length === 0) {
        issues.all.status = true;
        issues.all.message = 'كل الحقول مطلوبة';
        issues.status = true;
        return res.status(500).json({
          status: false,
          type: 'error',
          issues,
        });
      }
      if (typeof req.body.username === 'undefined' || !req.body.username) {
        issues.username.status = true;
        issues.username.message = 'اسم المسخدم مطلوب';
        issues.status = true;
      } else if (req.body.username.length < 6) {
        issues.username.status = true;
        issues.username.message = 'اسم المسخدم قصير أظف أكثر من 6 أحرف';
        issues.status = true;
      }
  
      if (typeof req.body.email === 'undefined' || !req.body.email) {
        issues.email.status = true;
        issues.email.message = 'البريد الاكتروني مطلوب';
        issues.status = true;
      } else if (!EmailValidator.validate(req.body.email)) {
        issues.email.status = true;
        issues.email.message = 'ادخل البريد الاكتروني بشكل صحيح';
        issues.status = true;
      }
  
      if (typeof req.body.password === 'undefined' || !req.body.password) {
        issues.password.status = true;
        issues.password.message = 'كلمة المرور مطلوب';
        issues.status = true;
      } else if (req.body.password.length < 8) {
        issues.password.status = true;
        issues.password.message = ' كلمة المرور قصيرة يجب اظافة كلمة المرور أكثر من 8 حروف';
        issues.status = true;
      }
      if (issues.status === true) {
        return res.status(500).json({
          status: false,
          type: 'error',
          issues,
        });
      }
      const ifExist = await validationUserIfExist({
        username: req.body.username,
        email: req.body.email,
        countryCode: req.body.countryCode,
        country: req.body.country,
      }).then((rs) => rs);
      if(ifExist.email) {
        issues.email.status = true;
        issues.email.message = 'البريد الاكتروني مستخدم بالفعل';
        issues.status = true
      } else {
        issues.email.message = '';
        issues.email.status = false;
       // issues.status = false
      }
      if(ifExist.username) {
        issues.username.status = true;
        issues.username.message = ' اسم المستخدم مستخدم بالفعل';
        issues.status = true;
      } else {
        issues.username.message = '';
        issues.username.status = false;
        //issues.status = false;
      }
      
      if (issues.status === true) {
        return res.status(500).json({
          status: false,
          type: 'exist',
          issues,
        });
      }

    db.Users
    .find()
    .sort([['_id', -1]])
    .limit(1)
    .then(async (findUser) => {
      var id = -1;
      if(findUser.length === 0) {
        id = 1;
      } else {
        id = findUser[0].id + 1;
      }
     
      var password = await hashPasswordUser({
        password: req.body.password
      }).then((rs) => rs.hasPassword)
      db.Users.create({
        id,
        username: req.body.username,
        email: req.body.email,
        'phone.value': '',
        password,
      })
      .then(async (newUser) => {
       // console.log(newUser)
       return res.status(200).json({
        error: false,
        status: true,
        type: 'succ',
        message: 'تم انشاء المستخدم بنجاح',
      });
      })
      .catch((errorNewUser) => {
        console.log(errorNewUser)
        issues.status = true
        issues.all.status = true
        issues.all.message = 'حدث خطأ ما تواصل مع الدعم الفني'
        return res.status(500).json({
          status: false,
          type: 'error',
          issues,
        });
      })
    })
    .catch((errorFindUser) => {
  //    console.log(errorFindUser)
      issues.status = true
      issues.all.status = true
      issues.all.message = 'حدث خطأ ما تواصل مع الدعم الفني'
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    })
    } catch (error) {
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

exports.updateDetailsUser = async (req, res) => {
  try {
    const issues = {
      status: false,
      all: {
        status: false,
        message: '',
      },
      username: {
        status: false,
        message: '',
      },
      firstName: {
        status: false,
        message: '',
      },
      lastName: {
        status: false,
        message: '',
      },
      email: {
        status: false,
        message: '',
      },
      balance: {
        status: false,
        message: '',
      },
      rate: {
        status: false,
        message: '',
      },
    };
    
    var firstName = false, lastName = false;

    if (Object.keys(req.body).length === 0) {
      issues.all.status = true;
      issues.all.message = 'كل الحقول مطلوبة';
      issues.status = true;
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    }

    if (typeof req.body.username === 'undefined' || !req.body.username) {
      issues.username.status = true;
      issues.username.message = 'اسم المسخدم مطلوب';
      issues.status = true;
    } else if ((typeof req.body.username !== 'undefined') && req.body.username.length < 6) {
      issues.username.status = true;
      issues.username.message = 'اسم المسخدم قصير أظف أكثر من 6 أحرف';
      issues.status = true;
    } 
    if (typeof req.body.firstName !== 'undefined' && req.body.firstName.length < 3) {
      issues.firstName.status = true;
      issues.firstName.message = 'الاسم الاول قصير يجب أظافة اسمك الاول أكثر من 3 حروف';
      issues.status = true;
    } else {
      firstName = true;
    }
  
    if (typeof req.body.country !== 'undefined' && req.body.country.length < 3) {
      issues.country.status = true;
      issues.country.message = 'الاسم الاول قصير يجب أظافة اسمك الاول أكثر من 3 حروف';
      issues.status = true;
    } else {
      country = true;
    }
    if (typeof req.body.rate !== 'undefined' && !req.body.rate) {
      issues.rate.status = true;
      issues.rate.message = 'يجب ارسال قيمة التخفيض';
      issues.status = true;
    } else if(Number(req.body.rate) < 0){
      issues.rate.status = true;
      issues.rate.message = 'يجب ان تكون قيمة التخفيض أكبر من 0';
      issues.status = true;
    }
if (typeof req.body.lastName !== 'undefined' && req.body.lastName.length < 3) {
      issues.lastName.status = true;
      issues.lastName.message = 'الاسم الاخير قصير يجب اظافة اسم الاخير أكثر من 3 حروف';
      issues.status = true;
    } else {
      lastName = true;
    }
  
    if (typeof req.body.email === 'undefined' || !req.body.email) {
      issues.email.status = true;
      issues.email.message = 'حقل ضروري';
      issues.status = true;
    } else  if (!EmailValidator.validate(req.body.email)) {
      issues.email.status = true;
      issues.email.message = 'ادخل البريد الاكتروني بشكل صحيح';
      issues.status = true;
    }
    if (typeof req.body.balance === 'undefined' || !req.body.balance) {
      issues.balance.status = true;
      issues.balance.message = 'حقل ضروري';
      issues.status = true;
    }
    
    /*if (typeof req.body.phone === 'undefined' || !req.body.phone) {
      issues.phone.status = true;
      issues.phone.message = ' رقم الهاتف مطلوب';
      issues.status = true;
    } else*/ 
   /* if (typeof req.body.phone !== 'undefined' && (req.body.phone.length < 8 || req.body.phone.length > 10)) {
      issues.phone.status = true;
      issues.phone.message = 'رقم الهاتف غير صحيح';
      issues.status = true
    } else {
      phone = true;
    }*/

    if (issues.status === true) {
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    }

    /*var removeZeroPhoneResponse = '';
    if(phone) {
      removeZeroPhoneResponse = await removeZeroPhone({
        phone: req.body.phone
      })
      .then((rs) => rs.phoneNotZero);
    } */
   /* const ifExist = await validationUserUpdateIfExist({
      id: req.params.userId,
      username: req.body.username,
      email: req.body.email,
    }).then((rs) => rs);*/

   /* if(ifExist.email) {
      issues.email.status = true;
      issues.email.message = 'البريد الاكتروني مستخدم بالفعل';
      issues.status = true
    } else {
      issues.email.message = '';
      issues.email.status = false;
    }
    
    if(ifExist.username) {
      issues.username.status = true;
      issues.username.message = ' اسم المستخدم مستخدم بالفعل';
      issues.status = true;
    } else {
      issues.username.message = '';
      issues.username.status = false;
    }*/
    
    if (issues.status === true) {
      return res.status(500).json({
        status: false,
        type: 'exist',
        issues,
      });
    }

    await db.Users.findOne({ _id: req.params.userId }, (err, userUpdate) => {
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
      //console.log(userUpdate)
     // userUpdate.email = req.body.email;
     // userUpdate.username = req.body.username;
      userUpdate.balance.total = req.body.balance;
      lastName?userUpdate.lastName = req.body.lastName:(userUpdate.lastName || '');
      firstName?userUpdate.firstName = req.body.firstName:(userUpdate.firstName || '');
      userUpdate.rate = req.body.rate;
      //phone?userUpdate.phone.value = removeZeroPhoneResponse:(userUpdate.phone.value || '');
      //country?userUpdate.phone.country = req.body.country: '';
      
    //  console.log(userUpdate);
      userUpdate.save();
      return res.status(200).json({
        status: true,
        message: "تم تحديث هذا المستخدم"
      });
    });
   /* if (users.modifiedCount < 1) {
      return res.status(500).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          all: {
            status: true,
            message: "لا يوجد هذه المستخدم"
          }
        }
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "تم تحديث هذا المستخدم"
      });
    }*/
  } catch(err) {
  //  console.log(err);
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
}
exports.updatePassword = async (req, res) => {

  const issues = {
    status: false,
    all: {
      status: false,
      message: '',
    },
    password: {
      status: false,
      message: '',
    },
  };

  if (Object.keys(req.body).length === 0) {
    issues.all.status = true;
    issues.all.message = 'كل الحقول مطلوبة';
    issues.status = true;
    return res.status(500).json({
      status: false,
      type: 'error',
      issues,
    });
  }

  if (typeof req.body.password === 'undefined' || !req.body.password) {
    issues.password.status = true;
    issues.password.message = 'اسم المسخدم مطلوب';
    issues.status = true;
  } else if (req.body.password.length < 6) {
    issues.password.status = true;
    issues.password.message = 'كلمة المرور قصيرة';
    issues.status = true;
  }

  if (issues.status === true) {
    return res.status(500).json({
      status: false,
      type: 'error',
      issues,
    });
  }
  
  await db.Users.findOne({ _id: req.params.userId }, async (err, userUpdate) => {
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
    var password = await hashPasswordUser({
      password: req.body.password
    }).then((rs) => rs.hasPassword)
    userUpdate.password = password;
    await userUpdate.save();
    return res.status(200).json({
      status: true,
      message: "تم تحديث هذا المستخدم"
    });
  });
}

exports.suspendUser = async (req, res) => {
  try {
    const issues = {
      status: false,
      all: {
        status: false,
        message: '',
      },
      suspendStatus: {
        status: false,
        message: '',
      }
    };
  
    if (Object.keys(req.body).length === 0) {
      issues.all.status = true;
      issues.all.message = 'كل الحقول مطلوبة';
      issues.status = true;
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    }
  
    if (typeof req.body.suspendStatus === 'undefined' || !req.body.suspendStatus) {
      issues.suspendStatus.status = true;
      issues.suspendStatus.message = 'نوح الحظر حقل ضروري';
      issues.status = true;
    } 
    
    if (issues.status === true) {
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    }
    await db.Users.findOne({ _id: req.params.userId }, async (err, userUpdate) => {
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
      userUpdate.suspend.push({
        status: req.body.suspendStatus,
        message: req.body.message !== 'undefined'?req.body.message:'',
        degreeDanger: req.body.degreeDanger !== 'undefined'?req.body.degreeDanger:'',
        solutions: req.body.solutions !== 'undefined'?req.body.solutions:'',
      })
      userUpdate.save();
      return res.status(200).json({
        status: true,
        message: "تم حظر المستخدم بنجاح"
      });
    });
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

exports.deleteUser = async (req, res) => {
  try {
    const issues = {
      status: false,
      all: {
        status: false,
        message: '',
      },
      password: {
        status: false,
        message: '',
      },
    };
   // console.log(req.params.userId)
    const users = await db.Users.deleteOne({ _id: req.params.userId });
      if (users.deletedCount < 1) {
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
      return res.status(200).json({
        error: false,
        status: true,
        type: "succ",
        message: "تم حذف الخدمة بنجاح"
      });
  } catch(err) {
    return res.status(500).json({
      error: true,
      type: 'site',
      issue: {
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      }
    });
  }
}

exports.usersPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
    } : false;
    // console.log(user)
    return res.render('pages/users', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'Users',
      user,
    });
  } catch (error) {
    //  console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      issue: {
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      }
    });
  }
};

exports.getHistorySignIn = async (req, res) => {
 try {
  db.Users.findOne({
    _id: req.params.userId
  })
  .populate('token')
  .then((user) => {
    if(!user) {
      return res.status(200).json({
        error: false,
        status: true,
        message: 'هذا المستخدم غير موجود'
      });
    } else {
      let tokens = []
      for(var t of user.token.tokens) {
        tokens.push({
          ip: t.ip,
          country: t.country,
          createAt: t.createAt
        })
      }
      return res.status(200).json({
        error: false,
        status: true,
        tokens,
      });    
    }
    
  })
  .catch((err) => {
    return res.status(500).json({
      error: true,
      type: 'site',
      issue: {
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      }
    });
  })
 } catch(err) {
  return res.status(500).json({
    error: true,
    type: 'site',
    issue: {
      all: {
        status: true,
        message: 'please contact developer for fixing issues',
      }
    }
  });
 }
}

exports.viewUser = async (req, res) => {
  try {
    db.Users.findOne({ _id: req.params.userId })
    .select('id email  lastName firstName username')
    .then((user) => {
      if(!user) {
        return res.status(500).json({
          error: true,
          status: false,
          type: "error",
          message: "لم يتم العثور على المستخدم"
        });
      }
      return res.status(200).json({
        status: true,
        type: "succ",
        user,
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
