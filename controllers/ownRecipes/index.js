const ctrlWrapper = require("../ctrlWrapper");
const addRecipe = require("./addRecipe");
const removeRecipe = require("./removeRecipe");
const getUserRecipes = require("./getUserRecipes");

module.exports = {
  addRecipe: ctrlWrapper(addRecipe),
  removeRecipe: ctrlWrapper(removeRecipe),
  getUserRecipes: ctrlWrapper(getUserRecipes),
};
