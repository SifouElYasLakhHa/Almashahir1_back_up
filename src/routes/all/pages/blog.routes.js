const express = require('express');

const router = express.Router();
const {
    blogPage,
} = require('../../../controllers/all/pages/blog.controller');
const {
  mexAuthLogin,
} = require('../../../utils/auth');

router.get('/blog', mexAuthLogin, blogPage);

module.exports = router;
