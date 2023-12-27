const db = require("../../../models/index");

exports.createChildPanels = (req, res) => {
    try {   
        const issues = {
            status: false,
            domain: {
              status: false,
              message: '',
            },
            currency: {
              status: false,
              message: '',
            },
            username: {
              status: false,
              message: '',
            },
            password: {
                status: false,
                message: '',
            },
        };
        if(typeof req.body.domain === 'undefined' || !req.body.domain) {
            issues.status = true;
            issues.domain.status = true;
            issues.domain.message = 'حقل مطلوب';
        }
        if(typeof req.body.currency === 'undefined' || !req.body.currency) {
            issues.status = true;
            issues.currency.status = true;
            issues.currency.message = 'حقل مطلوب';
        }
        if(typeof req.body.username === 'undefined' || !req.body.username) {
            issues.status = true;
            issues.username.status = true;
            issues.username.message = 'حقل مطلوب';
        } else if(req.body.username.length < 5) {
            issues.status = true;
            issues.username.status = true;
            issues.username.message = 'اسم المستخدم قصير يجب ادخال 5 حروف'; 
        }
        if(typeof req.body.password === 'undefined' || !req.body.password) {
            issues.status = true;
            issues.password.status = true;
            issues.password.message = 'حقل مطلوب';
        } else if(req.body.password.length < 8) {
            issues.status = true;
            issues.password.status = true;
            issues.password.message = 'كلمة المرور قصيرة يجب ادخال 8 حروف'; 
        }
        if (issues.status) {
            return res.status(400).json({
              status: false,
              type: 'required',
              issues,
            });
        }
        db.RequestChildPanels.find({})
        .then((findRequestChildPanels) => {
            db.RequestChildPanels.create({
                requestChildPanel: findRequestChildPanels.length === 0?1: findRequestChildPanels[findRequestChildPanels.length - 1].requestChildPanel + 1,
                userId: req.user._id,
                domain: req.body.domain,
                currency: req.body.currency,
                username: req.body.username,
                password: req.body.password,
            })
            .then((newRequestChildPanels) => {
                return res.status(200).json({ status: true })
            })
            .catch((e) => {
                console.log(e)
                return res.status(500).json({
                    error: true, status: false,
                    type: 'newRequestChildPanels',
                    issues: {
                        status: true,
                        all: {
                            status: false,
                            message: 'please contact developer for fixing issues',
                        }
                    }
                }); 
            })
        })
        .catch((e) => {
            return res.status(500).json({
                error: true, status: false,
                type: 'findRequestChildPanels',
                issues: {
                    status: true,
                    all: {
                        status: false,
                        message: 'please contact developer for fixing issues',
                    }
                }
            }); 
        })
    } catch (e) {
        return res.status(500).json({
          error: true, status: false,
          type: 'Site',
          issues: {
              status: true,
              all: {
                  status: false,
                  message: 'please contact developer for fixing issues',
              }
          }
        });
    }
}