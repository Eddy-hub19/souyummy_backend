const { Ingredient } = require("../../models/recipes");
console.log(Ingredient);

const ingredientList = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Ingredient.find();
  res.json(result);
};

module.exports = ingredientList;
