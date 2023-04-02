const { Ingredient } = require("../../models/recipes");

const ingredientList = async (req, res) => {
  const filter = {};
  const result = await Ingredient.find(filter);
  // console.log(result);
  res.json({ ingredients: result });
};

module.exports = ingredientList;
