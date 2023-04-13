const { Recipe } = require("../../models");

// ======================================================= //
const getUserRecipes = async (req, res, next) => {
  const userRecipes = await Recipe.find({ owner: req.params.userId });
  

  res.json(userRecipes);
};

// ======================================================= //
module.exports = getUserRecipes;
