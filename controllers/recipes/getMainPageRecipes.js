const { Recipe } = require("../../models");

const getMainPageRecipes = async (req, res, next) => {
  const BreakfastRecipes = await Recipe.find({ category: "Breakfast" }, null, { limit: 4 });

  const MiscellaneousRecipes = await Recipe.find({ category: "Miscellaneous" }, null, { limit: 4 });

  const ChikenRecipes = await Recipe.find({ category: "Chicken" }, null, { limit: 4 });

  const DessertsRecipes = await Recipe.find({ category: "Dessert" }, null, { limit: 4 });

  const mainPageRecipes = {
    breakfast: BreakfastRecipes,
    miscellaneous: MiscellaneousRecipes,
    chicken: ChikenRecipes,
    desserts: DessertsRecipes,
  };

  res.status(200).json(mainPageRecipes);
};

module.exports = getMainPageRecipes;
