const express = require("express");

const ctrl = require("../../controllers/shoppingList");

const { validateBody, authenticate } = require("../../middlewares");
const { addToShoppingListSchema } = require("../../models/shopingList");

const router = express.Router();

router.post("/", authenticate, validateBody(addToShoppingListSchema), ctrl.addToShoppingList);

router.get("/", authenticate, ctrl.getShoppingList);

router.delete("/:id", authenticate, ctrl.deleteFromShoppingList);

module.exports = router;
