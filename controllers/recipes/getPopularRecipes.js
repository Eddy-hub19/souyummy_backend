const { Recipe } = require("../../models");

const getPopularRecipes = async (req, res) => {
  const filter = {};
  const allRecipes = await Recipe.find(filter).sort("-popularity");
  res.json({ recipes: allRecipes });
};

module.exports = getPopularRecipes;
