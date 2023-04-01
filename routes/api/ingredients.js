const express = require("express");

const ingredientList = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/", ingredientList);
// router.get("/recipes/:id/ingredients/", ingredientList);

module.exports = router;
