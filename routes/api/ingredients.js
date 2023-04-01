const express = require("express");

const ingredientList = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/ingredients", ingredientList);
// router.get("/recipes/:id/ingredients/", ingredientList);

module.exports = router;
