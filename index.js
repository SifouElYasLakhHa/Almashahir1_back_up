const { Console } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const stripe = require("stripe")('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');
var axios = require('axios');

//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
//sk_test_51KqQkpHP7Scq2xyIDciLM4THZrO2yRHLn8TmBMpQDdAEopUDIFke1YAKNaaKBtkwBohfGK5m1KLGmOIrLg5aPlaL00VzXdOZXZ
const HOST = 'https://almashahir3.nay9ca.com';
const MAIN_HOST = 'https://almashahir1.nay9ca.com'
// static files
app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');
// middleware
app.use(express.json());


//acct_1KqQkpHP7Scq2xyI
// whsec_9389fb18564ed776955b04ea5c1f93f1eb7882b4aecd8936741413c32735ae48
// routes
app.post("/payment", async (req, res) => {
    const { product } = req.body;
    if(typeof  Number(product.amount) !== 'number') {
        return res.redirect(`${MAIN_HOST}/addfunds`)
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: Number(product.amount) * 100,
                },
                quantity: Number(product.quantity),
            },
        ],
        mode: "payment",
        success_url: `${HOST}/success/${product.transactionId}`,
        cancel_url: `${HOST}/cancel/${product.transactionId}`,
    });
    console.log('/******************************** session **************************************/')
    console.log(session)
    var data = JSON.stringify({
        "transactionApiId": session.payment_intent
    });
    var config = {
    method: 'put',
    url: `${MAIN_HOST}/api/stripe/transaction/update/${product.transactionId}`,
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };
    axios(config)
    .then(function (response) {
        return res.json({ id: session.id });
    })
    .catch(function (error) {
        return res.redirect(`${MAIN_HOST}/addfunds`)
    });
    
});

app.get("/transaction/:transactionId", async (req, res) => {
    try {
        const issues = {
            status: false,
            price: {
              status: false,
              message: ""
            },
            description: {
              status: false,
              message: ""
            },
        };
        const { price, description } = req.query;
        if (typeof price === "undefined") {
            issues.status = true;
            issues.price.status = true;
            issues.price.message = "حقل مطلوب";
        } else if(!price) {
            issues.status = true;
            issues.price.status = true;
            issues.price.message = "حقل مطلوب";
        } else if(typeof Number(price) !== "number") {
            issues.status = true;
            issues.price.status = true;
            issues.price.message = "You should send price as number or number as string";
        }
        if (typeof description === "undefined") {
            issues.status = true;
            issues.description.status = true;
            issues.description.message = "حقل مطلوب";
        } else if(typeof description !== "string") {
            issues.status = true;
            issues.description.status = true;
            issues.description.message = "You should send description as string";
        }
        if(issues.status) {
            return res.status(400).json({
                status: false,
                type: "required",
                issues,
            });
        }
        var config = {
            method: 'post',
            url: `${MAIN_HOST}/api/stripe/transaction/checker/${req.params.transactionId}`,
        };
        axios(config)
        .then(function (response) {
            console.log(response.data.status)
            if(response.data.status) {
                return res.render('checkout', {
                    product: {
                        name: description,
                        price,
                    },
                    host: HOST
                });
            }
        })
        .catch(function (error) {
            console.log(error)
            return res.redirect(`${MAIN_HOST}/addfunds`)
        });
      } catch (error) {
        return res.redirect(`${MAIN_HOST}/addfunds`)
      }
});

app.post("/webhook", async (req, res) => {
    console.log('/******************************** webhook **************************************/');
    console.log(req.body)
    console.log('/******************************** confirmation_method **************************************/');
    console.log(req.body.data.object.confirmation_method);
    console.log('/******************************** currency **************************************/');
    console.log(req.body.data.object.currency);
    console.log('/******************************** receipt_url **************************************/');
    console.log(req.body.data.object.receipt_url);
    console.log('/******************************** payment_intent **************************************/');
    console.log(req.body.data.object.payment_intent);
    console.log('/******************************** refunded **************************************/');
    console.log(req.body.data.object.refunded);
    console.log('/******************************** status **************************************/');
    console.log(req.body.data.object.status);
    console.log('/******************************** payment_method_details **************************************/');
    console.log(req.body.data.object.payment_method_details);
    console.log('/******************************** billing_details **************************************/');
    console.log(req.body.data.object.billing_details);
    console.log('/******************************** amount_refunded **************************************/');
    console.log(req.body.data.object.amount_refunded);
    console.log('/******************************** calculated_statement_descriptor **************************************/');
    console.log(req.body.data.object.calculated_statement_descriptor);

    if(req.body.data.object.object !== 'payment_intent') {
        var data = {
            "transactionStatus": typeof req.body.data.object.status !== 'undefined'? req.body.data.object.status: '',
            "paymentMethodDetails": {
                "card": {
                "brand": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.brand:'',
                "country": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.country:'',
                "exp_month": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.exp_month:'',
                "exp_year": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.exp_year:'',
                "funding": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.funding:'',
                "installments": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.installments:'',
                "last4": typeof  req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.last4:'',
                "mandate": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.mandate:'',
                "network": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.network:'',
                "three_d_secure": typeof req.body.data.object.payment_method_details !== 'undefined'? req.body.data.object.payment_method_details.card.three_d_secure:''
                },
                "type": typeof req.body.data.object.status !== 'undefined'? req.body.data.object.status: ''
            },
            "customerDetails": {
                "address": {
                    "city": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.address.city: '',
                    "country": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.address.country: '',
                    "line1": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.address.line1: '',
                    "line2": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.address.line2: '',
                    "postal_code": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.address.postal_code: '',
                    "state": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.address.state: ''
                },
                "email": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.email: '',
                "name": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.name: '',
                "phone": typeof req.body.data.object.customer_details !== 'undefined'? req.body.data.object.customer_details.phone: ''
            },
            "amountRefunded": typeof req.body.data.object.amountRefunded!== 'undefined'? req.body.data.object.amountRefunded: '',
            "calculatedStatementDescriptor": typeof req.body.data.object.calculated_statement_descriptor !== 'undefined'? req.body.data.object.calculated_statement_descriptor: '',
            "refunded": typeof req.body.data.object.refunded !== 'undefined'? req.body.data.object.refunded: false,
            "receiptUrl": typeof req.body.data.object.receipt_url !== 'undefined'? req.body.data.object.receipt_url: '',
            "currency": typeof req.body.data.object.currency !== 'undefined'? req.body.data.object.currency: ''
            };
    
            var config = {
            method: 'put',
            url: `${MAIN_HOST}/api/stripe/transaction/update/details/${req.body.data.object.payment_intent}`,
            data : data
            };
        
            axios(config)
            .then(function (response) {
                return res.json({  success: true });
            })
            .catch(function (error) {
                return res.redirect(`${MAIN_HOST}/addfunds`);
            });
    }
});

app.get("/success/:transactionId", async (req, res) => {
    try {
        return res.render('success', {
            host: HOST
        });
      } catch (error) {
        return res.redirect(`${MAIN_HOST}/addfunds`)
      }
});

app.get("/cancel/:transactionId", async (req, res) => {
    try {
        return res.render('cancel', {
            host: HOST
        });
      } catch (error) {
        return res.redirect(`${MAIN_HOST}/addfunds`)
      }
});
// listening...
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
