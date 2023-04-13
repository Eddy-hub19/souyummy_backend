const router = require("express").Router();

const auth = require("../../middlewares/auth");
const { recipes: ctrl } = require("../../controllers/");

router.get("/popular", auth, ctrl.getPopularRecipes);

router.get("/category-list", auth, ctrl.getCategories);
// router.get("/category-list", ctrl.getCategories);

router.get("/search/:keyWord", auth, ctrl.getRecipesByName);
// router.get("/search/:keyWord", ctrl.getRecipesByName);

router.get("/main-page", ctrl.getMainPageRecipes);

router.get("/:id", auth, ctrl.getRecipeById);

router.get("/category/:categoryName", auth, ctrl.getRecipesByCategory);
// router.get("/category/:category", auth, ctrl.getRecipesByCategory);

module.exports = router;
