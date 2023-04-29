const { Ingredient } = require("../models/recipes");

const getRecipeIngredients = async (recipeIngredients) => {
  const allIngredientList = await Ingredient.find({
    _id: {
      $in: recipeIngredients.map((recipeIngredient) =>
        recipeIngredient.id ? recipeIngredient.id : recipeIngredient.ingredient
      ),
    },
  });

  let merged = [];

  for(let i=0; i<allIngredientList.length; i++) {
    merged.push({
     ...allIngredientList[i]._doc, 
     ...(recipeIngredients.find((itmInner) => JSON.stringify(itmInner.ingredient ? itmInner.ingredient : itmInner.id) == JSON.stringify(allIngredientList[i]._id)))}
    );
  }

  return merged;
};

module.exports = getRecipeIngredients;
