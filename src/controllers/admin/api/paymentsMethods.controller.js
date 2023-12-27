const db = require("../../../models/index");

exports.createPayment = (req, res) => {
    try {
        db.Payments.create(req.body)
        .then((newPaymentsMethods) => {
            return res.status(200).json({
                status: true,
                payment: newPaymentsMethods
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