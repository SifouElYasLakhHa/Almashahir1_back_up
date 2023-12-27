//const crypto =  require('crypto');
//const Money =  require('ts-money');
//var { MCrypt } = require('mcrypt');
//var { stringify } = require('querystring');
//var Payeer = require('node-payeer-api').Payeer;

require('dotenv').config();

exports.createPayeerOrder = async (req, res) => {
    try {
        var accountData = {
            account: 'P1069681524',
            apiId: '466bbcef-cea6-40b7-8a72-903d165550aa',
            apiPass: '1421998AZEazeaaaa'
        }
        var Client = new Payeer(accountData);
       // console.log(Client.payoutCheck)

        /**/
        var requestOptions = {
            account: 'P1069681524',
            apiId: '466bbcef-cea6-40b7-8a72-903d165550aa',
            apiPass: '1421998AZEazeaaaa',
            ps: '26808',
            sumIn: '10.00',
            curIn: 'USD',
            curOut: 'USD'
        }
        
        /*
,
            accountNumber: '79191234567'
        */
            console.log(Client)
      /*  Client.payoutCheck(requestOptions, (err, result) => {
          if(err) {
            /*hanle error* /
            console.log(err)
          }
          console.log(result)
            /*some actions* /
        })*/
       /* const payeer = new Payeer({
            shopId: process.env.PAYEER_SHOP_ID,
            secretKey: process.env.PAYEER_SECRET_KEY,
            callbackUrls: {
              success_url: `${process.env.HOST}success',
              fail_url: '${process.env.HOST}fail',
              status_url: '${process.env.HOST}status`
            }
          });
           
          const orderId = '12345';
          const url = payeer.generatePaymentPageUrl(
            orderId,
            Money.fromDecimal(500, 'USD')
          );
          console.log(url)

          
 
            var accountId = process.env.ACCOUNTS_LOGIN_PAYEER,
                apiId     = process.env.API_ID_PAYEER,
                apiKey    = process.env.PAYEER_SECRET_KEY;
            
        const payeer = new Payeer({
            shopId: process.env.ACCOUNTS_LOGIN_PAYEER,
            secretKey: process.env.PAYEER_SECRET_KEY,
            callbackUrls: {
            success_url: 'https://test.com/success',
            fail_url: 'https://test.com/fail',
            status_url: 'https://test.com/status'
            }
        });
        
        const orderId = '12345';
        const url = payeer.generatePaymentPageUrl(
            orderId,
            Money.fromDecimal(500, 'EUR')
        );
        
        
        var accountId = process.env.ACCOUNTS_LOGIN_PAYEER,
        apiId     = process.env.API_ID_PAYEER,
        apiKey    = process.env.PAYEER_SECRET_KEY;*/

        //const { shopId, secretKey, callbackUrls } = this.config;
     /*   const shopId = process.env.PAYEER_SHOP_ID;
        const secretKey = process.env.SECRET_kEY_PAYEER;
        const callbackUrls = {
            success_url: 'https://codder.org/success',
            fail_url: 'https://codder.org/fail',
            status_url: 'https://codder.org/status'
        };
        
        const price = 10 ; //Money.fromDecimal(500, 'USD')
        const orderId = '392';
        const description = Buffer.from(`Order ID: ${orderId}`).toString('base64'); // done
        const amount = price.toFixed(2); // .toDecimal()
        const hash = [shopId, orderId, amount, 'USD', description];//price.currency
        const key = crypto.createHash('sha256')
                    .update(String(secretKey + orderId))
                    .digest('base64')
                    .substr(0, 32);

        

        //console.log(key)
        //return
        const urls = JSON.stringify(callbackUrls);
        const cipher = new MCrypt('rijndael-256', 'ecb');
        cipher.validateKeySize(false);
        cipher.open(key);
        console.log(cipher.encrypt(urls).toString('base64'))
        
        const params = encodeURIComponent(cipher.encrypt(urls).toString('base64'));
        
        hash.push(params, secretKey);
        const sign = '583F09C96DE108CFBEDB7A5EA16D0100D11E275B9E6D0B5C86DA33004BFD5345'; // done
        
        const queryParams = {
          m_shop: shopId,
          m_orderid: orderId,
          m_amount: amount,
          m_curr: 'USD',
          m_desc: description,
          m_sign: '583F09C96DE108CFBEDB7A5EA16D0100D11E275B9E6D0B5C86DA33004BFD5345',
          
        };*/
        /*
m_params: params,
          m_process: 'send'

        */
       /* return res.status(200).json({
            status: true,
            link: `https://payeer.com/merchant/?${stringify(queryParams)}`
        })*/
       // console.log(queryParams)

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            status: false,
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




/*
https://payeer.com/merchant/?m_shop=1583944908&m_orderid=382&m_amount=5.00&m_curr=USD&m_desc=2KXYudin2K%2FYqSDYtNit2YYg2KfZhNix2LXZitivIChzaWZvdWFsc2lsYW0p&m_sign=B7E4F247B98DAD4902F1500B261734DD62E54B6E69FE60EC30B5767EE977A1C1
https://payeer.com/merchant/?m_shop=1583944908&m_orderid=383&m_amount=10.00&m_curr=USD&m_desc=2KXYudin2K%2FYqSDYtNit2YYg2KfZhNix2LXZitivIChzaWZvdWFsc2lsYW0p&m_sign=7A9A488B6204BF9EB882E4CAACC0549217B383EEEC700A06A01381D6DBF35DDB
*/


/*
https://payeer.com/merchant/?m_shop=1583944908&m_orderid=392&m_amount=10.00&m_curr=USD&m_desc=2KXYudin2K%2FYqSDYtNit2YYg2KfZhNix2LXZitivIChzaWZvdWFsc2lsYW0p&m_sign=583F09C96DE108CFBEDB7A5EA16D0100D11E275B9E6D0B5C86DA33004BFD5345
https://payeer.com/merchant/?m_shop=1583944908&m_orderid=392&m_amount=10.00&m_curr=USD&m_desc=2KXYudin2K%2FYqSDYtNit2YYg2KfZhNix2LXZitivIChzaWZvdWFsc2lsYW0p&m_sign=583F09C96DE108CFBEDB7A5EA16D0100D11E275B9E6D0B5C86DA33004BFD5345

*/