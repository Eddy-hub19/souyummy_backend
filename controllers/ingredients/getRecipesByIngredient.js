const { Ingredient, Recipe } = require("../../models");
const { firstCapitalLetter } = require("../../helpers");
const mongoose = require("mongoose");

const getRecipesByIngredient = async (req, res) => {
  const ingredientName = firstCapitalLetter(req.params.ingredientName);

  if (!ingredientName) {
    res.status(400).json({ error: "Не вказанний інградієнт" });
    return;
  }

  try {
    const ingredient = await Ingredient.findOne({ ttl: ingredientName });

    if (!ingredient) {
      res.json([]);
      return;
    }

    const ingredientId = ingredient._id;

    const matchedRecipes = await Recipe.find({ "ingredients.id": mongoose.Types.ObjectId(ingredientId) }).populate(
      "ingredients.id"
    );

    res.json(matchedRecipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getRecipesByIngredient;
