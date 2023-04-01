const router = require("express").Router();
// const auth = require("../../middlewares/auth");
const { recipes: ctrl } = require("../../controllers/");

// router.get("/:id", auth, ctrl.getRecipeById);
router.get("/:id", ctrl.getRecipeById);
module.exports = router;
