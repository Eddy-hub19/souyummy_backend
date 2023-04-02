const express = require("express");

const ctrl = require("../../controllers/favorite");

const { authenticate } = require("../../middlewares");

const router = express.Router();
router.get("/", authenticate, ctrl.getFavorites);
router.post("/add/:id", authenticate, ctrl.addFavorite);
router.post("/del/:id", authenticate, ctrl.deleteFavorite);

module.exports = router;
