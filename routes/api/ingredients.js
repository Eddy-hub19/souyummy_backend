const express = require("express");

const auth = require("../../middlewares/auth");
const { ingredientList, getRecipesByIngredient } = require("../../controllers/ingredients");

const router = express.Router();

router.get("/list", auth, ingredientList);
router.get("/:ingredientName", getRecipesByIngredient);

module.exports = router;
