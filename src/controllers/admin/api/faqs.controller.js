const db = require('../../../models/index');

exports.createFaq = async (req, res) => {
  try {
    const issues = {
      status: false,
      question: {
        status: false,
        message: ""
      },
      answer: {
        status: false,
        message: ""
      }
    };
    if (Object.keys(req.body).length === 0) {
      issues.status = true;
      issues.question.status = true;
      issues.question.message = "حقل مطلوب";
      issues.status = true;
      issues.answer.status = true;
      issues.answer.message = "حقل مطلوب";
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    const { question, answer } = req.body;
    if (!question) {
      issues.status = true;
      issues.question.status = true;
      issues.question.message = "حقل مطلوب";
    }
    if (!answer) {
      issues.status = true;
      issues.answer.status = true;
      issues.answer.message = "حقل مطلوب";
    }
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues
      });
    }
    await db.Faqs.find({}, async (err, faqs) => {
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
      await db.Faqs.create({
        id: faqs.length === 0? 1 : faqs[faqs.length - 1].id + 1,
        question,
        answer
      })
      .then((faq) => {
        return res.status(200).json({
          error: false,
          status: true,
          type: "succ",
          message: "تم اضافة السؤال بنجاح"
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
exports.updateFaq = async (req, res) => {
  try {
    const issues = {
      status: false,
      question: {
        status: false,
        message: ""
      },
      answer: {
        status: false,
        message: ""
      },
      statusFaq: {
        status: false,
        message: ""
      },
    };
    if (Object.keys(req.body).length === 0) {
      issues.status = true;
      issues.question.status = true;
      issues.question.message = "حقل مطلوب";
      issues.status = true;
      issues.answer.status = true;
      issues.answer.message = "حقل مطلوب";
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    const { question, answer, statusFaq } = req.body;
    if (!question) {
      issues.status = true;
      issues.question.status = true;
      issues.question.message = "حقل مطلوب";
    }
    if (!answer) {
      issues.status = true;
      issues.answer.status = true;
      issues.answer.message = "حقل مطلوب";
    }
    if (typeof statusFaq === 'undefined') {
      issues.status = true;
      issues.statusFaq.status = true;
      issues.statusFaq.message = "حقل مطلوب";
    } else if(typeof JSON.parse(statusFaq) !== 'boolean') {
      issues.status = true;
      issues.statusFaq.status = true;
      issues.statusFaq.message = "You should send value as boolean true or false";
    }
    if (issues.status) {
      return res.status(400).json({
        status: false,
        type: "error",
        issues
      });
    }
    await db.Faqs.findOneAndUpdate({ _id: req.params.faqId }, {
      question,
      answer,
      status: JSON.parse(statusFaq)
    }, {
      new: false,
    }, (err, updateFaq) => {
      if(err) {
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
      if(!updateFaq) {
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
      return res.status(200).json({
        error: false,
        status: true,
        type: "succ",
        message: "تم تعديل  بنجاح"
      });
    });
  } catch (error) {
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
exports.deleteFaq = async (req, res) => {
  try {
    await db.Faqs.deleteOne({ _id: req.params.faqId });
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
exports.viewFaq = async (req, res) => {
  try {
    db.Faqs.findOne({ _id: req.params.faqId }, (err, faq) => {
      if(err) {
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
      if(!faq) {
        return res.status(500).json({
          error: true,
          status: false,
          type: "error",
          message: "لم يتم العثور على السؤال"
        });
      }
      return res.status(500).json({
        status: true,
        type: "succ",
        faq,
      });

    })
  } catch(err) {
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
}