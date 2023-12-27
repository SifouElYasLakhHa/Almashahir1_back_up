const db = require("../../../models/index");

exports.childPanelsUpdateStatus = (req, res) => {
    try {
        if(typeof req.body.status === 'undefined') {
            return res.status(500).json({
                error: true,
                type: 'required',
                status: {
                    status: true,
                    message: 'حقل ضروري',
                }
            });
        } else if(typeof JSON.parse(req.body.status) !== 'boolean') {
            return res.status(500).json({
                error: true,
                type: 'required',
                status: {
                    status: true,
                    message: 'You should send value as boolean',
                }
            });
        }
        db.RequestChildPanels.findOne({
            _id: req.params.childPanelId
        })
        .then(async (findRequestChildPanels) => {
            findRequestChildPanels.status = JSON.parse(req.body.status)
            await findRequestChildPanels.save();
            return res.status(200).json({
                status: true,
                message: 'تم تحديث حالة المتجر بنجاح'
            })
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).json({
                error: true,
                type: 'Update RequestChildPanels',
                all: {
                    status: true,
                    message: 'please contact developer for fixing issues',
                }
            });
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
          error: true,
          type: 'Site',
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
        });
    }
}