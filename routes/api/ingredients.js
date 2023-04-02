const express = require("express");

const { ingredientList, searchByIngredients } = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/list", ingredientList);
router.get("/recipes/search", searchByIngredients);

module.exports = router;
