const router = require("express").Router();
// const auth = require("../../middlewares/auth");
const { recipes: ctrl } = require("../../controllers/");

// router.get("/popular", auth, ctrl.getPopularRecipes);
router.get("/popular", ctrl.getPopularRecipes);

// router.get("/category-list", auth, ctrl.getCategories);
router.get("/category-list", ctrl.getCategories);

// router.get("/search/:keyWord", auth, ctrl.getRecipesByName)
router.get("/search/:keyWord",  ctrl.getRecipesByName)

router.get("/main-page", ctrl.getMainPageRecipes);


// router.get("/:id", auth, ctrl.getRecipeById);
router.get("/:id", ctrl.getRecipeById);

module.exports = router;
