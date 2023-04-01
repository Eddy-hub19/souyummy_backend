const express = require("express");

const { ctrl: ingredientList } = require("../../controllers/ingredients/");

const router = express.Router();

router.get("/recipes/:id/ingredients/", ingredientList);
// router.get("/ingredients/list", ingredientList);

module.exports = router;
