const db = require('../../../models/index');
require('dotenv').config();
const { 
  getFavoritesCategory,
 } = require("../../../utils/auth");
exports.createFavorite = async (req, res) => {
    try {
        const issues = {
            status: false,
            type: {
              status: false,
              message: '',
            },
          };
          const { type } = req.body;
          const user = req.user;
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
          if (typeof type === 'undefined') {
            issues.status = true;
            issues.type.status = true;
            issues.type.message = 'حقل مطلوب';
          } else if (!type) {
            issues.status = true;
            issues.type.status = true;
            issues.type.message = 'حقل مطلوب';
          } else if(typeof JSON.parse(type) === 'undefined') {
            issues.status = true;
            issues.type.status = true;
            issues.type.message = 'You should send type Bool as string or as Bool (true or false)'
          } 
          if (issues.status) {
            return res.status(400).json({
              status: false,
              type: 'required',
              issues,
            });
          }
          db.Favorites.findOne({
            userId: user._id,
            serviceId: req.params.serviceId,
            categoryId: req.params.categoryId,
          })
          .then(async (findFavorite) => {
            
            if(!findFavorite) {
              db.Favorites.find({})
                .then((findFavorites) => {
                  db.Favorites.create({
                      favorite: findFavorites.length === 0?1:findFavorites[findFavorites.length - 1].favorite + 1,
                      userId: user._id,
                      serviceId: req.params.serviceId,
                      categoryId: req.params.categoryId,
                      status: true
                  })
                  .then((createFavorite) => {
                      db.FavoritesCategories.find({})
                      .then((findFavoritesCategories) => {
                          db.FavoritesCategories.create({
                              favoritesCategories: findFavoritesCategories.length === 0?1:findFavoritesCategories[findFavoritesCategories.length - 1].favoritesCategories + 1,
                              userId: user._id,
                              categoryId: req.params.categoryId,
                              serviceId: req.params.serviceId,
                          })
                          .then((createFavoriteCategory) => {
                              return res.status(200).json({
                                status: true,
                                message: 'تم  الاظافة الى المفضلة بنجاح'
                              })
                          })
                          .catch((err) => {
                              return res.status(500).json({
                                  status: false,
                                  error: true,
                                  type: 'Find FavoritesCategories',
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
                          return res.status(500).json({
                              status: false,
                              error: true,
                              type: 'Find Favorites Categories',
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
                      console.log(err)
                      return res.status(500).json({
                          status: false,
                          error: true,
                          type: 'Create Favorite',
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

                  return res.status(500).json({
                      status: false,
                      error: true,
                      type: 'Find Favorites',
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
              console.log(JSON.parse(type))
              findFavorite.status = JSON.parse(type);
              await findFavorite.save();
              return res.status(200).json({
                status: true,
                message: 'تم  الاظافة الى المفضلة بنجاح'
              })
            }
          })
          .catch((err) => {
            return res.status(500).json({
                status: false,
                error: true,
                type: 'Find Favorite',
                issues: {
                    status: true,
                    all: {
                        status: true,
                        message: 'حدث خطأ ما تواصل مع الدعم الفني',
                    },
                },
            });
          })
          //JSON.parse(type)

    } catch(err) {
       // console.log(err)
        return res.status(500).json({
            status: false,
            error: true,
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
}
exports.viewsFavorite = async (req, res) => {
  try {
    const user = req.user;
    db.FavoritesCategories.find({
      userId: user._id,
    })
    .then(async (favoritesCategories) => {
      //console.log(favoritesCategories)
      let repetitionArray = [];
      if(!favoritesCategories) {
        return res.status(200).json({
          favoritesCategories: [],
        })
      } else {
        let favoritesCategoriesArray = []
        for(var f of favoritesCategories) {
          if(!repetitionArray.includes(f.categoryId.toString())) {
            repetitionArray.push(f.categoryId.toString())
            var gavoritesCategory =  await getFavoritesCategory({ categoryId: f.categoryId },{ userId: f.userId }).then((rs) => rs)
           // console.log(gavoritesCategory)
            if(!(!gavoritesCategory.favorites)) {
              favoritesCategoriesArray.push(gavoritesCategory.favorites)
            } 
          }
          
        }
        console.log(repetitionArray)
        return res.status(200).json({
          status: true,
          favoritesCategories: favoritesCategoriesArray,
        })
      }
    })
    .catch((e) => {
      console.log(e)
      return res.status(500).json({
        status: false,
        error: true,
        type: 'Find FavoritesCategories',
        issues: {
            status: true,
            all: {
                status: true,
                message: 'حدث خطأ ما تواصل مع الدعم الفني',
            },
        },
    });
    })
    
  } catch(e) {
   console.log(e)
    return res.status(500).json({
        status: false,
        error: true,
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
}