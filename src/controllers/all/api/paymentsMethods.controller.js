const db = require("../../../models/index");

exports.viewsPayment = (req, res) => {
    try {
        db.Payments.find()
        .select('')
        .then((payments) => {
            return res.status(200).json({
                status: true,
                payments
            })
        })
        .catch((err) => {
            return res.status(500).json({
                error: true,
                type: 'Create Payment Methode',
                message: 'please contact developer for fixing issues',
            });
        })
    } catch (error) {
        return res.status(500).json({
          error: true,
          type: 'Site',
          message: 'please contact developer for fixing issues',
        });
    }
}