const db = require('../../../models/index');
const { getServices } = require('../../../utils/auth');
require('dotenv').config();

exports.veiwsService = async (req, res) => {
  try {
    db.Categories.find({ sort: { $gt: Number(req.params.lastSortCategory) - 1, $lt: Number(req.params.lastSortCategory) + 2 }}, async (err, categories) => {
        if(err) {
        return res.status(500).json({
          error: true,
          type: 'site',
          message: 'please contact developer for fixing issues',
        });
      }
      if(categories.length === 0) {
        return res.status(200).json({
            status: false,
            categories: []
        });
      }
      else {
        var categoriesArray = [];
        var i = 0;
        for(var c of categories) {
         categoriesArray.push({
           category: categories[i],
           services: await getServices(c._id).then((rs) => rs.services),
         })
         i++;
        }
      //  console.log(categoriesArray)
        return res.status(200).json({
            status: false,
            categories: categoriesArray
        });
      }
      
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};



exports.veiwService = async (req, res) => {
  try {
    db.Services.findOne({ _id: req.params.serviceId })
    .select('price refill status dripfeed service sort categoryId name description min max linkDuplicates createAt updateAt')
    .then((service) => {
      return res.status(200).json({
        status: false,
        service
      });
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'findService',
        all: {
          status: false,
          message: 'please contact developer for fixing issues',
        }
      });
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      type: 'site',
      all: {
        status: false,
        message: 'please contact developer for fixing issues',
      }
    });
  }
};


exports.viewsServicesCategory = async (req, res) => {
  try {
    console.log('hi')
    db.Services.find({
      categoryId: req.params.categoryId,
      status: true
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
