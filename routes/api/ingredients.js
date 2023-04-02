const express = require("express");

const { ingredientList, getRecipesByIngredient } = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/list", ingredientList);
router.get("/", getRecipesByIngredient);

module.exports = router;
