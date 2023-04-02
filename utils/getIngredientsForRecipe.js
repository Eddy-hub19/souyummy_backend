const getIngredientsList = require("../utils/getIngredientsList");

const getRecipeIngredients = async (recipeIngredients) => {
  const allIngredientList = await await getIngredientsList();

  return recipeIngredients.reduce((acc, currentIngredient, index) => {
    const data = allIngredientList.filter((ingredient) => ingredient._id === currentIngredient.id.valueOf());
    return [...acc, ...data];
  }, []);
};

module.exports = getRecipeIngredients;
