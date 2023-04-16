const { default: mongoose } = require("mongoose");
const { Recipe } = require("../../models");

const getUserRecipes = async (req, res, next) => {
  const objectId = new mongoose.Types.ObjectId(req.params.userId);
  const userRecipes = await Recipe.find({ owner: objectId });
  // const userRecipes = await Recipe.find({ owner: req.params.userId });

  res.json(userRecipes);
};

module.exports = getUserRecipes;
