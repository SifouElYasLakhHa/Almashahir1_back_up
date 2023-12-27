const EmailValidator = require('email-validator');
const db = require('../../models/index');

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const {
  generateAuthToken,
  validationUserIfExist,
  hashPasswordUser,
  removeZeroPhone,
  sendEmail,
  makeId,
} = require('../../utils/auth');

const {
  forgetPassword,
} = require('../../utils/emailTemplate');

exports.signOutApi = async (req, res) => {
  try {
    await res.clearCookie('auth_token');
    await res.cookie('auth_token', '', { maxAge: 0, httpOnly: true });
    return res.redirect('/');
  } catch(e) {
    //console.log(e)
    return res.status(500).json({
      error: true,
      status: false,
      type: 'site',
      all: {
        status: true,
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
      }
    })
  }
}
exports.loginApi = async (req, res) => {
  try {
    const issues = {
      status: false,
      all: {
        status: false,
        message: '',
      },
      ip: {
        status: false,
        message: '',
      },
      country: {
        status: false,
        message: '',
      },
    };

   /* if (typeof req.body.ip === 'undefined' || !req.body.ip) {
      issues.status = true
      issues.ip.status = true
      issues.ip.message = 'You should send IP Address of user when try login';
    }
     if (typeof req.body.country === 'undefined' || !req.body.country) {
      issues.status = true
      issues.country.status = true
      issues.country.message = 'You should send Country of user when try login';
    }*/

    if(issues.status){
      return res.status(200).json({
        status: false,
        issues
      });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({
        status: false,
        type: 'error',
        error: true,
        issues: {
          status: true,
          all: {
            status: true,
            message: 'كل الحقول مطلوبة',
          }
        }
      });
    } else if (!req.body.username) {
      return res.status(200).json({
        status: false,
        type: 'error',
        error: true,
        issues: {
          status: true,
          all: {
            status: true,
            message: 'اسم المستخدم حقل ضروري',
          }
        }
      });
    } else if(req.body.username.length < 4){
      return res.status(200).json({
        status: false,
        error: true,
        type: 'error',
        issues: {
          status: true,
          all: {
            status: true,
            message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
          }
        }
      });
    } 
    if (!req.body.password) {
        return res.status(200).json({
          status: false,
          error: true,
          type: 'error',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'كلمة السر حقل ضروري',
            }
          }
        });
      } else if(req.body.password.length < 8){
        return res.status(200).json({
          status: false,
          error: true,
          type: 'error',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'كلمة السر قصيرة جدا يجب أن تكون اكثر من 7 أحرف ',
            }
          }
        });
      } 
    db.Users
    .findOne({ username: req.body.username })
    .then(async (findUserUsername) => {
      if(!findUserUsername) {
        return res.status(200).json({
          status: false,
          error: true,
          issues: {
            status: false,
            all: {
              status: true,
              message: 'كلمة المرور او اسم المستخدم غير صحيح'
            }
          },
          status: false
        });
      } else if(findUserUsername.status === 3) {
        return res.status(200).json({
          status: false,
          error: true,
          type: 'error',
          issues: {
            status: true,
            all: {
              status: true,
              message: `تم اغلاق حسابك بشكل نهائي يرجى قراءة <a href="${process.env.host}/terms">الشروط و الأحكام</a>, تواصل معنا ان كنت تعتقد أننا على خطأ.`,
            }
          }
        });
      } else if(findUserUsername.status === 2){
        return res.status(200).json({
          status: false,
          type: 'error',
          error: true,
          issues: {
            status: true,
            all: {
              status: true,
              message: `لقد تم تعليق حسابك تواصل مع الدعم الفني لحل المشكلة راجع <a href="${process.env.host}/terms">الشروط و الأحكام</a>`,
            }
          }
        });
      } else {
        const isMatch = await bcrypt.compare(req.body.password, findUserUsername.password);
        if (!isMatch) {
          return res.status(200).json({
            error: true,
            status: false,
            issues: {
              status: false,
              all: {
                status: true,
                message: 'كلمة المرور او اسم المستخدم غير صحيح'
              }
            },
            status: false
          });
        }
        const options = {
          ////expires: new Date(`${Date.now()}9999`),
          secure: false, // set to true if your using https
        };
        let token = await generateAuthToken(
          findUserUsername,
        {
            ip: '', // req.body.ip
            country: '' //req.body.country                  
        }
       )
      findUserUsername.ip = ''; // req.body.ip
      await findUserUsername.save();
      await res.cookie('auth_token', `Bearer ${token.authToken}`, options);
      ////console.log('hi_test')
      return res.status(200).json({
        error: false,
        status: true,
        type: 'succ',
        message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
      });
      }
    })
    .catch((e) => {
     ////console.log('/********1*******/');
     ////console.log(err)
      return res.status(200).json({
        error: true,
        status: false,
        type: 'site',
        all: {
          status: true,
          message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
        }
      });
    })
    
  } catch (e) {
    ////console.log('/*******2********/');
    ////console.log(err)
    return res.status(200).json({
      error: true,
      status: false,
      type: 'site',
      all: {
        status: true,
        message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
      }
    })
  }
};
exports.registreApi = async (req, res) => {
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
      phone: {
        status: false,
        message: '',
      },
      password: {
        status: false,
        message: '',
      },
      countryCode: {
        status: false,
        message: '',
      },
      fromCountry: {
        status: false,
        message: '',
      },
    };
   /* issues.status = true
    issues.all.status = true
    issues.all.message = 'التسجيل متوقف في الموقع حاليا يمكنك التواصل مع الدعم الفني مع ارسال الايمايل الخاص بك اذا أردت التسجيل في هذه الفترة بارك الله فيك سوف نعود قريبا ..!'
    return res.status(500).json({
      status: false,
      type: 'error',
      issues,
    });*/
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
    } else if(req.body.username.length > 20) {
      issues.username.status = true;
      issues.username.message = 'اسم المسخدم طويل يجب ان يكون أقل من 20 حرف';
      issues.status = true;
    }

    if (typeof req.body.firstName === 'undefined' || !req.body.firstName) {
      issues.firstName.status = true;
      issues.firstName.message = 'الاسم الأول مطلوب';
      issues.status = true;
    } else if (req.body.firstName.length < 3) {
      issues.firstName.status = true;
      issues.firstName.message = 'الاسم الاول قصير يجب أظافة اسمك الاول أكثر من 3 حروف';
      issues.status = true;
    }

    if (typeof req.body.lastName === 'undefined' || !req.body.lastName) {
      issues.lastName.status = true;
      issues.lastName.message = 'الاسم الأول مطلوب';
      issues.status = true;
    } else if (req.body.lastName.length < 3) {
      issues.lastName.status = true;
      issues.lastName.message = 'الاسم الاخير قصير يجب اظافة اسم الاخير أكثر من 3 حروف';
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
    } else if(req.body.password.length > 20) {
      issues.password.status = true;
      issues.password.message = ' كلمة المرور طويلة يجب اظافة كلمة المرور أقل من 20 حروف';
      issues.status = true;
    }

    if (typeof req.body.phone === 'undefined' || !req.body.phone) {
      issues.phone.status = true;
      issues.phone.message = ' رقم الهاتف مطلوب';
      issues.status = true;
    } else if (req.body.phone.length < 8 || req.body.phone.length > 11) {
      issues.phone.status = true;
      issues.phone.message = 'رقم الهاتف غير صحيح';
      issues.status = true
    }

    if (typeof req.body.countryCode === 'undefined' || !req.body.countryCode) {
      issues.countryCode.status = true;
      issues.countryCode.message = 'رمز الدولة مطلوب';
      issues.status = true;
    }

    if (typeof req.body.ip === 'undefined' || !req.body.ip) {
      issues.all.status = true;
      issues.all.message = 'تحقق من اتصالك بالانترنيت او اعد تحميل الصفحة';
      issues.status = true;
    }

    if (typeof req.body.country === 'undefined' || !req.body.country) {
      issues.all.status = true;
      issues.all.message = 'تحقق من اتصالك او اعد تحميل الصفحة';
      issues.status = true;
    }

    if (issues.status === true) {
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    }
   
    var removeZeroPhoneResponse = await removeZeroPhone({
      phone: req.body.phone
    })
    .then((rs) => rs.phoneNotZero);
    const ifExist = await validationUserIfExist({
      phone: removeZeroPhoneResponse,
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
    }
    if(ifExist.phone) {
      issues.phone.status = true;
      issues.phone.message = 'رقم الهاتف مستخدم بالفعل';
      issues.status = true
    } else {
      issues.phone.message = '';
      issues.phone.status = false;
    }
    if(ifExist.username) {
      issues.username.status = true;
      issues.username.message = ' اسم المستخدم مستخدم بالفعل';
      issues.status = true;
    } else {
      issues.username.message = '';
      issues.username.status = false;
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
        'phone.value': removeZeroPhoneResponse,
        password,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        country: req.body.country,
        affiliateBy: typeof req.body.affiliate === 'undefined'?'':req.body.affiliate,
        affiliate: await makeId(6),
        earnStatus: typeof req.body.affiliate === 'undefined'?false:true,
      })
      .then(async (newUser) => {
       // //console.log(newUser)
        db.CodeCounties.findOne({
          country: req.body.country,
        })
        .then(async (codeCountryIfExist) => {
          if(!codeCountryIfExist) {
            db.CodeCounties.create({
              country: req.body.country,
              codeCountry: req.body.countryCode,
            })
            .then(async (newCodeCountry) => {
              newUser.phone.country = newCodeCountry._id
              newUser.ip = req.body.ip;
              newUser.save();
              ////console.log(newCodeCountry)
              const options = {
                //expires: new Date(`${Date.now()}9999`),
                secure: false, // set to true if your using https
              };
      
              let token = await generateAuthToken(
                newUser,
                {
                    ip: req.body.ip,
                    country: req.body.country                  
                }
              )
              await res.cookie('auth_token', `Bearer ${token.authToken}`, options);
              //console.log(token.authToken)
             // return
              if(typeof req.body.affiliate !== 'undefined') {
                await db.Users.findOne({
                  affiliate: req.body.affiliate
                })
                .then(async(findUserAff) => {
                  
                  if(!findUserAff) {
                  } else {
                    findUserAff.affiliateRegistration += 1;
                    await findUserAff.save();
                  }
                  return res.status(200).json({
                    error: false,
                    status: true,
                    type: 'succ',
                    message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
                  });
                })
                .catch((e) => {
                 // //console.log(errorNewUser)
                  issues.status = true
                  issues.all.status = true
                  issues.all.message = 'حدث خطأ ما تواصل مع الدعم الفني'
                  return res.status(500).json({
                    status: false,
                    type: 'error',
                    issues,
                  });
                })
              } else {
                return res.status(200).json({
                  error: false,
                  status: true,
                  type: 'succ',
                  message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
                });
              }
              
            })
            .catch((e) => {
              //console.log(errorNewUser)
              issues.status = true
              issues.all.status = true
              issues.all.message = 'حدث خطأ ما تواصل مع الدعم الفني'
              return res.status(500).json({
                status: false,
                type: 'error',
                issues,
              });
            })
          } else {
            newUser.phone.country = codeCountryIfExist._id
            newUser.save();
            const options = {
              //expires: new Date(`${Date.now()}9999`),
              secure: false, // set to true if your using https
            };
            let token = await generateAuthToken(
              newUser,
              {
                  ip: req.body.ip,
                  country: req.body.country                  
              }
            )
            await res.cookie('auth_token', `Bearer ${token.authToken}`, options);
            //console.log(token.authToken)
           // return
            if(typeof req.body.affiliate !== 'undefined') {
              await db.Users.findOne({
                affiliate: req.body.affiliate
              })
              .then(async(findUserAff) => {
                if(!findUserAff) {
                } else {
                  findUserAff.affiliateRegistration += 1;
                  await findUserAff.save();
                }
                return res.status(200).json({
                  error: false,
                  status: true,
                  type: 'succ',
                  message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
                });
              })
              .catch((e) => {
               // //console.log(errorNewUser)
                issues.status = true
                issues.all.status = true
                issues.all.message = 'حدث خطأ ما تواصل مع الدعم الفني'
                return res.status(500).json({
                  status: false,
                  type: 'error',
                  issues,
                });
              })
            } else {
              return res.status(200).json({
                error: false,
                status: true,
                type: 'succ',
                message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
              });
            }
          }
        })
        .catch((e) => {
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
      .catch((e) => {
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
    .catch((e) => {
      issues.status = true
      issues.all.status = true
      issues.all.message = 'حدث خطأ ما تواصل مع الدعم الفني'
      return res.status(500).json({
        status: false,
        type: 'error',
        issues,
      });
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      type: 'site',
      issues: {
        status: true,
        all: {
          status: true,
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        }
      }
    });
  }
};
exports.changePassUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({
        status: false,
        type: 'error',
        issues: {
          status: true,
          all: {
            status: true,
            message: 'كل الحقول مطلوبة',
          }
        }
      });
    } 

    if (!req.body.password) {
        return res.status(200).json({
          status: false,
          type: 'error',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'كلمة السر حقل ضروري',
            }
          }
        });
    } else if(req.body.password.length < 8){
      return res.status(200).json({
        status: false,
        type: 'error',
        issues: {
          status: true,
          all: {
            status: true,
            message: 'كلمة السر قصيرة جدا يجب أن تكون اكثر من 7 أحرف',
          }
        }
      });
    } 

    var password = await hashPasswordUser({
      password: req.body.password
    }).then((rs) => rs.hasPassword)
    
    db.Users
    .findOne({ _id: req.user._id })
    .then(async (findUser) => {
      findUser.password = password;
      await findUser.save();
      return res.status(200).json({
        error: false,
        status: true,
        type: 'succ',
        message: 'تم تحديث كلمة مرورك بنجاح',
      });
    })
    .catch((err) => {
     //console.log('/********1*******/');
     //console.log(err)
      return res.status(500).json({
        error: true,
        type: 'site',
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
      });
    })
    
  } catch (error) {
    //console.log('/*******2********/');
    //console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
       message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
    });
  }
};
exports.changeKeyApi = async (req, res) => {
  try {
    db.Users
    .findOne({ _id: req.user._id })
    .then(async (findUser) => {
      findUser.apiKey = uuidv4();
      await findUser.save();
      return res.status(200).json({
        error: false,
        status: true,
        type: 'succ',
        message: 'تم تحديث رمز التكامل الخاص بك بنجاح',
        apiKey: findUser.apiKey
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        type: 'site',
        status: false,
        all: {
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
          status: true
        }
      });
    })
    
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        status: true
      }
    });
  }
};
exports.changeGender = async (req, res) => {
  try {
    ////console.log('hi')
    db.Users
    .findOne({ _id: req.user._id })
    .then(async (findUser) => {
      findUser.gender = req.body.gender;
      await findUser.save();
      //console.log(findUser)
      return res.status(200).json({
        error: false,
        status: true,
        type: 'succ',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        type: 'site',
        status: false,
        all: {
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
          status: true
        }
      });
    })
    
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        status: true
      }
    });
  }
};
exports.requestForgetPassword =  async (req, res) => {
  try {
    if(typeof req.body.email === 'undefined' || !req.body.email) {
      return res.status(500).json({
        error: true,
        type: 'required',
        issues: {
          status: true,
          email: {
            status: true,
            message: 'حقل مطلوب'
          }
        },
      });
    }
    db.Users.findOne({
      email: req.body.email
    })
    .then(async (user) => {
      if(!user) {
        return res.status(200).json({ 
          status: true 
        });
      } else {
        var uuidv4 = uuidv4();
        user.resetPassword = uuidv4;
        await user.save();
        ////console.log('hi_2')
        await sendEmail('طلب تغيير كلمة المرور', forgetPassword({
          forgetLink: `${process.env.HOST}resetpassword/${uuidv4}`,
          supportEmail: process.env.EMAIL_SUPPORT
        }, 'ar'), req.body.email).then((rs) => rs);
        return res.status(200).json({ 
          status: true 
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        type: 'site',
        status: false,
        all: {
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
          status: true
        }
      });
    })
  } catch(e) {
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
        message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        status: true
      }
    });
  }
}

exports.changePasswordForget = async (req, res) => {
  try {
    if(typeof req.body.password === 'undefined' || !req.body.password) {
      return res.status(500).json({
        error: true,
        type: 'required',
        issues: {
          status: true,
          password: {
            status: true,
            message: 'حقل مطلوب'
          }
        },
      });
    }
    db.Users
    .findOne({ resetPassword: req.params.resetPasswordId })
    .then(async (findUser) => {
      if(!findUser) {
        return res.redirect('/resetpassword')
      } else {
        findUser.resetPassword = '';
        ////console.log(password)
        findUser.password = await hashPasswordUser({
          password: req.body.password
        }).then((rs) => rs.hasPassword);
       // //console.log(findUser)
        await findUser.save();
        const options = {
          ////expires: new Date(`${Date.now()}9999`),
          secure: false, // set to true if your using https
        };
        let token = await generateAuthToken(
          findUser,
        {
            ip: "", // req.body.ip || 
            country: "" // req.body.country ||                  
        }
       )
      findUser.ip = req.body.ip;
      await findUser.save();
      await res.cookie('auth_token', `Bearer ${token.authToken}`, options);
      return res.status(200).json({
        status: true
      });
      }
    })
    .catch((err) => {
      //console.log(err)
      return res.status(500).json({
        error: true,
        type: 'findUser',
        status: false,
        all: {
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
          status: true
        }
      });
    })
    
  } catch (err) {
    //console.log(err)
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        status: true
      }
    });
  }
};
