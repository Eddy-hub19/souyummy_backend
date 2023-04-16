const router = require("express").Router();
const { ownRecipes } = require("../../controllers");
const { authenticate, isValidId } = require("../../middlewares");

router.post("/add", authenticate, ownRecipes.addRecipe);

router.delete("/remove/:recipeId", authenticate, isValidId, ownRecipes.removeRecipe);

router.get("/:userId", authenticate, ownRecipes.getUserRecipes);

module.exports = router;
