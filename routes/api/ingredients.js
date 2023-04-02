const express = require("express");

const ingredientList = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/list", ingredientList);
// router.get("/recipes/:id/ingredients/", ingredientList);

module.exports = router;
