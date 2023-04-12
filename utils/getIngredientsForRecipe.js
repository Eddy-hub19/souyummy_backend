const { Ingredient } = require("../models/recipes");

const getRecipeIngredients = async (recipeIngredients) => {
  return await Ingredient.find({
    _id: {
      $in: recipeIngredients.map((recipeIngredient) => recipeIngredient.id),
    },
  });
};

module.exports = getRecipeIngredients;
