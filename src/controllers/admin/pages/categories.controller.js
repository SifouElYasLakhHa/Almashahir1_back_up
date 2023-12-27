const { Categories } = require("../../../models");

exports.createCategory = async (req, res) => {
  try {
    const issues = {
      status: false,
      name: {
        status: false,
        message: ""
      },
      description: {
        status: false,
        message: ""
      }
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

    const { name, description, sort } = req.body;

    if (!name) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "اسم القسم مطلوب";
    }

    if (!description) {
      issues.status = true;
      issues.name.status = true;
      issues.name.message = "وصف القسم مطلوب";
    }

    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }

    let sortNumber = 1;
    if (!sort) {
      const categories = await Categories.find({})
        .sort({ sort: -1 })
        .limit(1)
        .select("sort");

      if (categories.length > 0) {
        sortNumber = categories[0].sort + 1;
      }
    } else {
      sortNumber = sort;
    }

    const lastCategory = await Categories.findOne({})
      .sort({ id: -1 })
      .select("id");

    const category = await Categories.create({
      id: lastCategory ? lastCategory.id + 1 : 1,
      name,
      description,
      sort: sortNumber
    });

    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم اضافة القسم بنجاح"
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

exports.updateCategory = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          all: {
            status: true,
            message: "رقم القسم مطلوب"
          }
        }
      });
    }

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

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          name: {
            status: true,
            message: "اسم القسم مطلوب"
          }
        }
      });
    }

    if (!description) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          description: {
            status: true,
            message: "وصف القسم مطلوب"
          }
        }
      });
    }

    const category = await Categories.updateOne(
      { id: req.params.id },
      req.body
    );

    if (category.modifiedCount < 1) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          all: {
            status: true,
            message: "لا يوجد قسم بهذا الرقم"
          }
        }
      });
    }

    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم تعديل القسم بنجاح"
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

exports.deleteCategory = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues: {
          status: true,
          all: {
            status: true,
            message: "رقم القسم مطلوب"
          }
        }
      });
    }

    const category = await Categories.deleteOne({ id: req.params.id });
    if (category.deletedCount < 1) {
      return res.status(500).json({
        error: true,
        status: false,
        type: "error",
        message: "لم يتم القسم على السؤال"
      });
    }

    return res.status(200).json({
      error: false,
      status: true,
      type: "succ",
      message: "تم حذف القسم بنجاح"
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
