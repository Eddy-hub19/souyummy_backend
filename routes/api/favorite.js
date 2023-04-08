const express = require("express");

const ctrl = require("../../controllers/favorite");

const { authenticate } = require("../../middlewares");

const router = express.Router();
router.get("/", authenticate, ctrl.getFavorites);
router.put("/add/:id", authenticate, ctrl.addFavorite);
router.delete("/del/:id", authenticate, ctrl.deleteFavorite);

module.exports = router;
