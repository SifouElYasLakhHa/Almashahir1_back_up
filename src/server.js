const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(404).send({
        status: false,
        message: 'invalid JSON'
      });
      throw Error('invalid JSON');
    }
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(
  cors({
    origin: [
      process.env.HOST,
    ],
    credentials: false,
  }),
);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, './../public')));
app.set('view engine', 'ejs');

const indexPage = require('./routes/all/pages/index.routes');
const authAllApi = require('./routes/auth/authAll.routes');
const authAllPages = require('./routes/auth/authAllPages.routes');
const termsPage = require('./routes/all/pages/terms.routes');
const faqPage = require('./routes/all/pages/faqs.routes');
const howItWorkPage = require('./routes/all/pages/howItWork.routes');
const blogPage = require('./routes/all/pages/blog.routes');
const apiPage = require('./routes/all/pages/api.routes');
const affiliatesPage = require('./routes/all/pages/affiliates.routes');
const updatesPage = require('./routes/all/pages/updates.routes');
const giftsPage = require('./routes/all/pages/gifts.routes');
const childPanelsPage = require('./routes/all/pages/childPanels.routes');
const manageUsersPage = require('./routes/admin/pages/users.routes');
const manageAdminUsersApi = require('./routes/admin/pages/users.routes');
const manageCategoriesPages = require("./routes/admin/pages/categories.routes");
const faqsApi = require("./routes/admin/pages/faqs.routes");
const servicesApi = require("./routes/admin/pages/services.routes");
const ordersPage = require('./routes/all/pages/orders.routes');
const ticketsPage = require('./routes/all/pages/tickets.routes');
const manageTicketsAdminPage = require("./routes/admin/pages/tickets.routes");
const manageUsersAdminApi = require("./routes/admin/api/users.routes");
const manageCategoriesApi = require("./routes/admin/api/categories.routes");
const manageFaqsApi = require("./routes/admin/api/faqs.routes");
const manageServicesApi = require("./routes/admin/api/services.routes");
const manageProvidersApi = require("./routes/admin/api/providers.routes");
const manageTypesServicesApi = require("./routes/admin/api/typesServices.routes");
const manageTypesServicesPages = require("./routes/admin/pages/typesServices.routes");
const manageProvidersPages = require("./routes/admin/pages/providers.routes");
const orderApi = require("./routes/all/api/orders.routes");
const payeerApi = require("./routes/all/api/payeer.routes");
const servicesPage = require("./routes/all/pages/services.routes");
const stripeApi = require("./routes/all/api/stripe.routes");
const managePaymentsMethodsApi = require("./routes/admin/api/paymentsMethods.routes");
const fundsPage = require("./routes/all/pages/funds.routes");
const paymentsMethodsApi = require("./routes/all/api/paymentsMethods.routes");
const favoritesApi = require("./routes/all/api/favorite.routes");
const ticketsApi = require("./routes/all/api/tickets.routes");
const accountPage = require("./routes/all/pages/account.routes");
const settingsPage = require("./routes/admin/pages/settings.routes");
const servicesApiUser = require("./routes/all/api/services.routes");
const refillsApiUser = require("./routes/all/api/refills.routes");
const refillsPageUser = require("./routes/all/pages/refills.routes");
const ordersPageAdmin = require("./routes/admin/pages/orders.routes");
const refillsPageAdmin = require("./routes/admin/pages/refills.routes");
const requestChildPanelsApi = require("./routes/all/api/requestChildPanels.routes");
const manageRequestChildPanelsPages = require("./routes/admin/pages/childPanels.routes");
const manageRequestChildPanelsApi = require("./routes/admin/api/childPanels.routes");
const managePaymentsPages = require("./routes/admin/pages/payments.routes");


app.use('/', indexPage);
app.use('/', authAllPages);
app.use('/', termsPage);
app.use('/', faqPage);
app.use('/', howItWorkPage);
app.use('/', blogPage);
app.use('/', apiPage);
app.use('/', affiliatesPage);
app.use('/', updatesPage);
app.use('/', giftsPage);
app.use('/', childPanelsPage);
app.use('/', manageUsersPage);
app.use('/', ordersPage);
app.use("/", faqsApi);
app.use("/", servicesApi);
app.use("/", ticketsPage);
app.use("/", manageCategoriesPages);
app.use("/", manageTicketsAdminPage);
app.use('/api/auth', authAllApi);
app.use("/api", manageUsersAdminApi);
app.use("/api", manageCategoriesApi);
app.use('/api', manageAdminUsersApi);
app.use('/api', manageFaqsApi);
app.use('/api', manageServicesApi);
app.use('/api', manageProvidersApi);
app.use('/api', manageTypesServicesApi);
app.use('/', manageTypesServicesPages);
app.use('/', manageProvidersPages);
app.use('/api', orderApi);
app.use('/api', payeerApi);
app.use('/', servicesPage);
app.use('/api', stripeApi);
app.use('/api', managePaymentsMethodsApi);
app.use('/', fundsPage);
app.use('/api', paymentsMethodsApi);
app.use('/api', favoritesApi);
app.use('/api', ticketsApi);
app.use('/', accountPage);
app.use('/', settingsPage);
app.use('/api', servicesApiUser);
app.use('/api', refillsApiUser);
app.use('/', refillsPageUser);
app.use('/', ordersPageAdmin);
app.use('/', refillsPageAdmin);
app.use('/api', requestChildPanelsApi);
app.use('/', manageRequestChildPanelsPages);
app.use('/api', manageRequestChildPanelsApi);
app.use('/', managePaymentsPages);

module.exports = app;
