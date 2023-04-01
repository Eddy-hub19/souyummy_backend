const { ShoppingList } = require("../../models");

const addToShoppingList = async (req, res) => {
  const { nameIngredient, weight, image, recipeId } = req.body;

  const result = await ShoppingList.create({
    userId: req.user._id,
    nameIngredient,
    weight,
    image,
    recipeId,
  });

  res.status(201).json(result);
};

module.exports = addToShoppingList;
