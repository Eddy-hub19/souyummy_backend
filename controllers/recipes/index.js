const ctrlWrapper = require("../ctrlWrapper");
// const getCategories = require("./getCategories");
const getRecipeById = require("./getRecipeById");
const getPopularRecipes = require("./getPopularRecipes");
const getMainPageRecipes = require("./getMainPageRecipes");

module.exports = {
  //   getCategories: ctrlWrapper(getCategories),
  getRecipeById: ctrlWrapper(getRecipeById),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getMainPageRecipes: ctrlWrapper(getMainPageRecipes),
};
