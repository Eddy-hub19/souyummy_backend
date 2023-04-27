const { Recipe } = require("../../models/");

const 
getRecipesByCategory = async (req, res) => {
  const { categoryName } = req.params;

  const result = await Recipe.find({ category: categoryName }, null);

  res.status(200).json(result);
};

module.exports = getRecipesByCategory;
