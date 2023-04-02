const express = require("express");

const auth = require("../../middlewares/auth");
const ingredientList = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/list", auth, ingredientList);
// router.get("/recipes/:id/ingredients/", ingredientList);

module.exports = router;
