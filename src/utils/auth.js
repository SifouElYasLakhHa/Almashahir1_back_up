const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const superagent = require('superagent');
const nodemailer = require('nodemailer');
var axios = require('axios');
const db = require('../models/index');
require('dotenv').config();

const { 
  Users,
  CodeCounties,
} = db;

function randomIntFromInterval() { // min and max included 
  return Math.floor(Math.random() * (14 - 0 + 1) + 0);
}

exports.makeId = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.nameToSlug = (name) => {
  var nameSplit = name.trim();
  nameSplit = nameSplit.split(' ');
  var slug = '';
  for(var n = 0; n < nameSplit.length; n++) {
    if(n < nameSplit.length - 1) {
      slug += nameSplit[n] + '-';
    } else {
      slug += nameSplit[n];
    }
  }
  return slug;
}
exports.sendEmail = (subject, html, email) => {
  var PORT_HOST_EMAIL = Number(process.env.PORT_HOST_EMAIL)
  let transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: PORT_HOST_EMAIL,
    auth: {
      user: process.env.EMAIL_SENDING_MESSAGE,
      pass: process.env.PASSWORD_EMAIL_SENDING_MESSAGE
    }
  });
  return new Promise(async (resolve, reject) => {
    try {
      if(isNaN(PORT_HOST_EMAIL)) {
        resolve({
          status: false,
          message: 'Port of hosting not number please check env file it should write it as number ex: 465 its default port of SMTP'
        });
      }
          var info = await transporter.sendMail({
            from: process.env.EMAIL_SENDING_MESSAGE,
            to: email,
            subject: subject,
            html: html,
          })
          //console.log(info)
          resolve({
            status: true,
            message: 'The message has been sent to this email successfully',
          })
    } catch (e) {
      //   //console.log('hi')
      reject({
          status: false,
          message: e.message
      });
    }
  });
}
exports.randomProducts = async (price) => {
  return new Promise(async (resolve, reject) => {
    var products = [
      "Coffee",
      "Cappuccino",
      "Milk",
      "Water",
      "Soft drinks",
      "Coffee with milk",
      "Sparkling water",
      "Extra sugar",
      "Extra milk",
      "Juice",
      "Juice with milk",
      "Natural juice",
      "Natural juice with milk",
      "Natural juice Soft drinks",
      "Special natural juice",
    ];
    //const randomIntFromInterval = await randomIntFromInterval(0, 15).then((rs) => rs)
    ////console.log(randomIntFromInterval())
    //return
    var productsOrder = '';
    if(price === 10) {
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 20 && price > 10) {
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 30 && price > 20) {
      productsOrder += ' 1 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 40 && price > 30) {
      productsOrder += ' 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 3'
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 50 && price > 10) {
      productsOrder += ' 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 5'
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 60 && price > 50) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 5'
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 1'
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 70 && price > 60) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 5'
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 80 && price > 70) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 5'
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 90 && price > 80) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 5'
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 100 && price > 90) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 110 && price > 100) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 120 && price > 110) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 130 && price > 120) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 8'
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 140 && price > 130) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 170 && price > 140) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 200 && price > 170) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 250 && price > 200) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 280 && price > 250) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 350 && price > 280) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += pproductsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += pproductsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 400 && price > 350) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 ' 
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 500 && price > 400) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += pproductsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else if(price < 600 && price > 500) {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 7 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    } else {
      productsOrder += ' 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 7 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 4 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 5 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 8 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 6 '
      productsOrder += products[randomIntFromInterval()]
      productsOrder += ' | 2 '
      productsOrder += products[randomIntFromInterval()]
    }
    resolve(productsOrder);
  })
}
const getServiceFavoritesCategory = (service) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.Services.findOne({
        _id: service.serviceId
      })
      .select('price averageTime refill status rating dripfeed id sortCategory sort speed quality executionTime guarantee startTime categoryId name description addType type rate min max statusServiceProvider linkDuplicates')
      .then((service) => {
        if(!service) {
          resolve({
            status: false
          })
        } else {
          resolve({
            status: true,
            service
          })
        }
      })
      .catch((err) => {
        resolve({
          status: false
        })
      })
    } catch(err) {
      resolve({
        status: false
      })
    }
  })
}
const getCategoryFavoritesCategory = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.Categories.findOne({
        _id: category.categoryId
      })
      .then((findCategory) => {
        ////console.log(category.categoryId)
        if(!category) {
          resolve({ 
            status: false
           })
        } else {
          ////console.log(category)
          resolve({
            status: true,
            category: findCategory
          })
        }
      })
      .catch((err) => {
        ////console.log(err)
        resolve({
          status: false
        })
      })
    } catch(err) {
     // //console.log(err)
      resolve({
        status: false
      })
    }
  })
}
exports.getFavoritesCategory = (category, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.Favorites.find({
        categoryId: category.categoryId,
        userId: user.userId,
        status: true,
      })
      .then(async (findFavorites) => {
       // //console.log(findFavorites.length === 0)
        if(findFavorites.length === 0) {
          resolve({
            status: true,
            favorites: []
          })
        } else {
          let findFavoritesArray = []
          //let categoryObj = {}
          
          var categoryFavoritesCategory = await getCategoryFavoritesCategory({ categoryId: category.categoryId }).then((rs) => rs)
         // //console.log(categoryFavoritesCategory)
          for(var f of findFavorites) {
            findFavoritesArray.push(await getServiceFavoritesCategory({ serviceId: f.serviceId }).then((rs) => rs))
          }
          categoryFavoritesCategory.services = findFavoritesArray;
        }
        ////console.log(categoryFavoritesCategory)
        resolve({
          status: true,
          favorites: categoryFavoritesCategory
        })
      })
      .catch((err) => {
        ////console.log(err)
        resolve({
          status: false
        })
      })
    } catch(err) {
      ////console.log(err)
      resolve({
        status: false
      })
    }
  })
}
exports.createRefillApi = (order, provider, refill) => {
  return new Promise(async (resolve, reject) => {
    (async () => {
      try {
        const response = await superagent.post(`${provider.url}?key=${provider.key}&action=refill&order=${order.orderId}`);
        if(typeof response._body.error !== 'undefined') {
          resolve({
            status: false,
            error: response._body.error
          })
        } else {
          db.Refills.findOne({
            refill: refill.refillId
          })
          .then(async (refill) => {
            refill.refillId = response._body.refill
            await refill.save();
            resolve({ status: true });
          })
          .catch((e) => {
            reject({
              status: false,
              error: e
            });
          })
        }
      } catch (e) {
          reject({
            status: false,
            error: e
          });
      }
    })();
  })
}
exports.getServicesProviderAll = (provider, category) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.Services.find({
        providerId: provider.providerId,
        categoryId: category.categoryId
      })
      .populate('categoryId')
      .then((services) =>{
        services.sort(function(a, b){return a.sortCategory - b.sortCategory});
        resolve({
          services,
        })
      })
      .catch((e) => {
        reject({
          status: false,
          error: e,
          services: []
        })
      })
    } catch (e) {
      reject({
        status: false,
        error: e,
        services: []
      })
    }
  });
}

exports.createOrderProvider = async (provider) => {
  return new Promise((resolve, reject) => {
    try {
      var config = {
        method: 'post',
        url: provider.urlRequest,
      };
      
      axios(config)
      .then(function (response) {
        resolve({
          status: true,
          order: response.data.order
        })
      })
      .catch(function (e) {
        resolve({
          status: false
        })
      });
    } catch(e) {
      resolve({
        status: false
      })
    }
  })
}

exports.getServicesProvider = (provider) => {
  return new Promise(async (resolve, reject) => {
    (async () => {
      try {
        const response = await superagent.post(`${provider.url}?key=${provider.key}&action=${provider.action}`);
        if(typeof response._body.error !== 'undefined') {
          resolve({
            status: false,
            error: response._body.error,
            services: [],
          })
        } else {
          resolve({
            status: true,
            services: response._body
          })
        }
      } catch (e) {
        reject(e)
      }
    })();
  })
}
exports.isUrlValid = (url) => {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
exports.generateAuthToken = (user, infoLogin) => {
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRER, { expiresIn: '9999 days' });
  return new Promise((resolve, reject) => {
    if (!user.token) {
      db.OAuthTokens.create({
        tokens: [
          {
            value: token,
            ip: infoLogin.ip,
            country: infoLogin.country,
          },
        ],
      })
        .then((tokenArrayDb) => db.Users.findOneAndUpdate({ _id: user._id }, { token: tokenArrayDb._id }, { new: true }))
        .then((userToken) => {
          resolve({
            authToken: token,
            status: true,
          });
        })
        .catch((err) => {
          reject({
            issue: {
              message: 'أعد المحاولة لاحقا',
              status: true,
            },
            status: false,
          });
        });
    } else {
      db.OAuthTokens.findOneAndUpdate(
        { _id: user.token },
        {
          $push: {
            tokens: {
              value: token,
              ip: infoLogin.ip,
              country: infoLogin.country,
            },
          },
        },
        { new: true },
        async (err, tokenOAuth, done) => {
          if (err) {
            reject({
              issue: {
                message: 'أعد المحاولة لاحقا',
                status: true,
              },
              status: false,
            });
          }
          resolve({
            authToken: token,
            status: true,
          });
        },
      );
    }
  });
};

function getServicefavorite(serviceId, userId) {
  return new Promise((resolve, reject) => {
    try {
      
       db.Favorites.findOne({ serviceId, userId }, (err, favorite) => {
        if(err) {
          reject({
            status: false,
            error: err
          })
        }
        //console.log(favorite)
        if(!favorite) {
          resolve({
            status: true,
            favorite: false,
          })
        } else {
          resolve({
            status: true,
            favorite: favorite.status
          })
        }
      })
    } catch(err) {
      reject({
        status: false,
        error: err
      })
    }
  })
}
exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.getServicesfavorite = async (category, user) => {
  return new Promise((resolve, reject) => {
    try {
       db.Services.find({ categoryId: category.categoryId, status: true }, async (err, services) => {
        if(err) {
          reject({
            status: false,
            error: err
          })
        }
        if(services.length === 0) {
          resolve({
            status: true,
            services: [],
          })
        } else {
          ////console.log(user.userId)
          services.sort(function(a, b){return a.sortCategory - b.sortCategory});
          
          var servicesArray = [];
          for(var s of services) {
            servicesArray.push({
              _id: s._id,
              price: {
                newPrice: s.price.newPrice
              },
              min: s.min,
              max: s.max,
              refill: s.refill,
              status: s.refill,
              rating: s.rating,
              dripfeed: s.dripfeed,
              service: s.service,
              sort: s.sort,
              name: s.name,
              categoryId: s.categoryId,
              description: s.description,
              linkDuplicates: s.linkDuplicates,
              createAt: s.createAt,
              updateAt: s.updateAt,
              favorite: await getServicefavorite(s._id, user.userId).then((rs) => rs.favorite),
              executionTime: s.executionTime,
              startTime: s.startTime,
              guarantee: s.guarantee,
              averageTime: s.averageTime,
              speed: s.speed,
              quality: s.quality,
            })
            ////console.log(servicesArray)
          }
          //await getServicefavorite(s._id, user.userId).then((rs) => rs)
          //console.log(servicesArray)
          resolve({
            status: true,
            services: servicesArray
          })
        }
      })
    } catch(err) {
      reject({
        status: false,
        error: err
      })
    }
  })
}
exports.getServices = async (categoryId) => {
  return new Promise((resolve, reject) => {
    try {
       db.Services.find({ categoryId }, async (err, services) => {
        if(err) {
          reject({
            status: false,
            error: err
          })
        }
        if(services.length === 0) {
          resolve({
            status: true,
            services: [],
          })
        } else {
          services.sort(function(a, b){return a.sortCategory - b.sortCategory});
          resolve({
            status: true,
            services
          })
        }
      })
    } catch(err) {
      reject({
        status: false,
        error: err
      })
    }
  })
}
exports.validationUserIfExist = async (user) => await new Promise((resolve, reject) => {
  try {
    let username = false;
    let email = false;
    let phone = false;
    let all = false;
    let count = 0;
    Users.findOne({ username: user.username }, (err, userUsername) => {
    //  //console.log(userUsername)
      if (err) {
        resolve({
          status: false,
          issue: {
            all: {
              status: false,
              message: 'حدث خطأ ما تواصل مع المطور',
            },
          },
        });
      } else if (!userUsername) {
      } else {
        count++;
        username = true;
      }
      
      Users.findOne({ email: user.email }, (err, userEmail) => {
        if (err) {
          resolve({
            status: false,
            issue: {
              all: {
                status: false,
                message: 'حدث خطأ ما تواصل مع المطور',
              },
            },
          });
        } else if (!userEmail) {
        } else {
          count++;
          email = true;
        }
        ////console.log(email)
        Users.findOne({ 'phone.value': user.phone })
        .then((userPhone) => {
          ////console.log(user.phone)
         // //console.log(userPhone)
          if (err) {
            resolve({
              status: false,
              issue: {
                all: {
                  status: false,
                  message: 'حدث خطأ ما تواصل مع المطور',
                },
              },
            });
          } else if (!userPhone) {
            phone = false;
            resolve({
              status: true,
              all,
              email,
              username,
              phone,
            });
          } else {
            
            CodeCounties.findOne({ _id: typeof userPhone.phone.country === 'undefined'? '': userPhone.phone.country })
            .then((userPhoneCountryCode) => {
              ////console.log(userPhone)
              if(!userPhoneCountryCode) {
                phone = false;
              } else if(userPhoneCountryCode.country === user.country){
                count++;
                phone = true;
              } else {
                phone = false;
              }
              if (count === 3) all = true;
              ////console.log(err)
              resolve({
                status: true,
                all,
                email,
                username,
                phone,
              });
            })
            .catch((err) => {
              resolve({
                status: false,
                all: false,
                issue: {
                  all: {
                    status: false,
                    message: 'حدث خطأ ما تواصل مع المطور',
                  },
                },
              });
            })         
          }

          });
      });
    });
  } catch (err) {
    resolve({
      status: false,
      all: false,
      issue: {
        all: {
          status: false,
          message: 'حدث خطأ ما تواصل مع المطور',
        },
      },
    });
  }
});
exports.validationUserUpdateIfExist = async (user) => await new Promise((resolve, reject) => {
  try {
    let username = false;
    let email = false;
    let all = false;
    let count = 0;
    Users.findOne({ username: user.username, id: { $ne: user.id } }, (err, userUsername) => {
    //  //console.log(userUsername)
      if (err) {
        resolve({
          status: false,
          issue: {
            all: {
              status: false,
              message: 'حدث خطأ ما تواصل مع المطور',
            },
          },
        });
      } else if (!userUsername) {
      } else {
        count++;
        username = true;
      }
      
      Users.findOne({ email: user.email, id: { $ne: user.id } }, (err, userEmail) => {
        
        if (err) {
          resolve({
            status: false,
            issue: {
              all: {
                status: false,
                message: 'حدث خطأ ما تواصل مع المطور',
              },
            },
          });
        } else if (!userEmail) {
        } else {
          count++;
          email = true;
        }
        if (count === 2) all = true;
        resolve({
          status: true,
          all,
          email,
          username,
        });

        ////console.log(email)
       /* Users.findOne({ 'phone.value': user.phone })
        .then((userPhone) => {
          ////console.log(user.phone)
          //console.log(userPhone)
          if (err) {
            resolve({
              status: false,
              issue: {
                all: {
                  status: false,
                  message: 'حدث خطأ ما تواصل مع المطور',
                },
              },
            });
          } else if (!userPhone) {
            phone = false;
            resolve({
              status: true,
              all,
              email,
              username,
              phone,
            });
          } else {
            
            CodeCounties.findOne({ _id: typeof userPhone.phone.country === 'undefined'? '': userPhone.phone.country })
            .then((userPhoneCountryCode) => {
              ////console.log(userPhone)
              if(!userPhoneCountryCode) {
                phone = false;
              } else if(userPhoneCountryCode.country === user.country){
                count++;
                phone = true;
              } else {
                phone = false;
              }
              if (count === 3) all = true;
              ////console.log(err)
              resolve({
                status: true,
                all,
                email,
                username,
                phone,
              });
            })
            .catch((err) => {
              resolve({
                status: false,
                all: false,
                issue: {
                  all: {
                    status: false,
                    message: 'حدث خطأ ما تواصل مع المطور',
                  },
                },
              });
            })         
          }

          });
          */
      });
    });
  } catch (err) {
    resolve({
      status: false,
      all: false,
      issue: {
        all: {
          status: false,
          message: 'حدث خطأ ما تواصل مع المطور',
        },
      },
    });
  }
});
exports.hashPasswordUser = async (user) => await new Promise((resolve, reject) => {
  try {
    resolve({
      status: true,
      hasPassword: bcrypt.hash(user.password, 10),
    }) 
  } catch (err) {
    resolve({
      status: false,
      hasPassword: '',
      issue: {
        status: true,
        all: {
          status: true,
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        },
      },
    });
  }
});

exports.removeZeroPhone = async (user) => await new Promise((resolve, reject) => {
  try {
    var newPhone = '';
    if(user.phone.charAt(0) === '0') {
      for(var i = 1; i < user.phone.length; i ++) {
        newPhone += user.phone.charAt(i)
      }
    } else {
      newPhone = user.phone
    }
    resolve({
      status: true,
      phoneNotZero: newPhone,
    }) 
  } catch (err) {
    resolve({
      status: false,
      phoneNotZero: '',
      issue: {
        status: true,
        all: {
          status: true,
           message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
        },
      },
    });
  }
})
exports.mexAuthLogin = async (req, res, next) => {
  var auth = req.headers.authorization
  //typeof auth !== 'undefined'? auth = auth.split(' ')[1]: auth = undefined;
  
  var cookie = req.headers.cookie || auth
  ////console.log('cookie')
  ////console.log(cookie)
  if(!cookie) {
    next()
    return
  }
  
  cookie = cookie.split('%20')[1] || cookie.split(' ')[1]
  
  if(typeof cookie === "undefined") {
    next()
    return
  }
  
    cookie = cookie.split(';')[0]
    
    db.OAuthTokens.findOne({ 'tokens.value': cookie }, (err, tkn) => {
     
      if(err || !tkn) {
        next()
        return
      }
        jwt.verify(tkn.tokens[0].value, process.env.JWT_SECRER, (err, user) => {
          if (err) {
            return res.redirect('/');
            /*return res.render('pages/index', {
              mainTitle: process.env.APP_NAME,
              host: process.env.HOST,
              subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
            });*/
          }
          db.Users.findOne({ _id: user._id })
              .then(async usr => {
                if(!usr) {
                  next()
                  return
                }
                req.user = usr;
                //console.log(usr)
               next()
                }).catch(err => {
                  return res.redirect('/');
                 /* return res.render('pages/index', {
                    mainTitle: process.env.APP_NAME,
                    host: process.env.HOST,
                    subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
                  });*/
                });
              });
        });
}
exports.authLogin = async (req, res, next) => {
  var auth = req.headers.authorization
  //typeof auth !== 'undefined'? auth = auth.split(' ')[1]: auth = undefined;
  
  var cookie = req.headers.cookie || auth
  //console.log(cookie)
  if(!cookie) {
    return res.redirect('/');
   /* return res.render('pages/index', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
    });*/
  }
 
  cookie = cookie.split('%20')[1] || cookie.split(' ')[1]
  
  if(typeof cookie === "undefined") {
    return res.redirect('/');
    /*return res.render('pages/index', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
    });*/
  }
  
    cookie = cookie.split(';')[0]
    
  db.OAuthTokens.findOne({ 'tokens.value': cookie }, (err, tkn) => {
    ////console.log(tkn)
    if(err || !tkn) {
      return res.redirect('/');
      /* return res.render('pages/index', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
      });*/
    }
    jwt.verify(tkn.tokens[0].value, process.env.JWT_SECRER, (err, user) => {
      if (err) {
        return res.redirect('/');
        /*return res.render('pages/index', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
        });*/
      }
      db.Users.findOne({ _id: user._id })
      .then(async usr => {
        
        if(!usr) {
          return res.redirect('/');
          /* render('pages/index', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
          });*/
        }
        
        req.user = usr;
        next();
        }).catch(err => {
          return res.redirect('/');
          /*return res.render('pages/index', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
          });*/
        });
      });
    });
}

exports.isAdmin = async (req, res, next) => {
    if(!req.user) {
      return res.redirect('/');
    }
    if(req.user.role !== 1) {
      return res.redirect('/');
    }
    next();
}
exports.authLoginMain = async (req, res, next) => {
  var auth = req.headers.authorization
  //typeof auth !== 'undefined'? auth = auth.split(' ')[1]: auth = undefined;
  
  var cookie = req.headers.cookie || auth
  ////console.log(cookie)
  if(!cookie) {
    //return res.redirect('/');
    return res.render('pages/index', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
    });
  }
 
  cookie = cookie.split('%20')[1] || cookie.split(' ')[1]
  
  if(typeof cookie === "undefined") {
    //return res.redirect('/');
    return res.render('pages/index', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
    });
  }
  
    cookie = cookie.split(';')[0]
    
    db.OAuthTokens.findOne({ 'tokens.value': cookie }, (err, tkn) => {
      ////console.log(tkn)
      if(err || !tkn) {
       // return res.redirect('/');
        return res.render('pages/index', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
        });
      }
        jwt.verify(tkn.tokens[0].value, process.env.JWT_SECRER, (err, user) => {
          if (err) {
            //return res.redirect('/');
            return res.render('pages/index', {
              mainTitle: process.env.APP_NAME,
              host: process.env.HOST,
              subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
            });
          }
          db.Users.findOne({ _id: user._id })
              .then(async usr => {
                
                if(!usr) {
                 // return res.redirect('/');
                  render('pages/index', {
                    mainTitle: process.env.APP_NAME,
                    host: process.env.HOST,
                    subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
                  });
                }
                req.user = usr;
                next();
                }).catch(err => {
                  //return res.redirect('/');
                  return res.render('pages/index', {
                    mainTitle: process.env.APP_NAME,
                    host: process.env.HOST,
                    subTitle: 'ارخص واسرع سيرفر زيادة متابعين',
                  });
                });
              });
        });
}
exports.authLoginAllPage = async (req, res, next) => {
  var auth = req.headers.authorization
  //typeof auth !== 'undefined'? auth = auth.split(' ')[1]: auth = undefined;
  
  var cookie = req.headers.cookie || auth
  ////console.log(cookie)
  if(!cookie || typeof cookie === "undefined") {
    next()
    return
  }
  //console.log(cookie)
  
  cookie = cookie.split('%20')[1] || cookie.split(' ')[1]
  
  if(typeof cookie === "undefined") {
    next()
    return
  }
    cookie = cookie.split(';')[0]
    db.OAuthTokens.findOne({ 'tokens.value': cookie }, (err, tkn) => {
      if(err || !tkn) {
        next()
        return
      } else {
        jwt.verify(tkn.tokens.length === 0? '' : tkn.tokens[0].value, process.env.JWT_SECRER, (err, user) => {
          if (err) {
            next()
          }
          db.Users.findOne({ _id: user._id })
              .then(async usr => {
                if(!usr) {
                  next()
                  return
                }
                req.user = usr;
                return res.redirect('/')
               
                }).catch(err => {
                  next()
                  return
                });
              });
      }
        });
}