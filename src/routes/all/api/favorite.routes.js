const express = require("express");

const router = express.Router();
const {
  createFavorite,
  viewsFavorite,
} = require("../../../controllers/all/api/favorite.controller");
const { 
  authLogin,
 } = require("../../../utils/auth");

router.post("/favorite/add/:categoryId/:serviceId", authLogin, createFavorite);
router.get("/favorites/views", authLogin, viewsFavorite);

module.exports = router;
