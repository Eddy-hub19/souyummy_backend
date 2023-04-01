const router = require("express").Router();
// const auth = require("../../middlewares/auth");
const { recipes: ctrl } = require("../../controllers/");

// router.get("/popular", auth, ctrl.getPopularRecipes);
router.get("/popular", ctrl.getPopularRecipes);

// router.get("/:id", auth, ctrl.getRecipeById);
router.get("/:id", ctrl.getRecipeById);

module.exports = router;
