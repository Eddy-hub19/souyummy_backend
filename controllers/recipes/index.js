const ctrlWrapper = require("../ctrlWrapper");
const getCategories = require("./getCategories");
const getRecipeById = require("./getRecipeById");
const getPopularRecipes = require("./getPopularRecipes");
const getMainPageRecipes = require("./getMainPageRecipes");
const getRecipesByName = require("./getRecipesByName")


module.exports = {
    getCategories: ctrlWrapper(getCategories),
  getRecipeById: ctrlWrapper(getRecipeById),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getMainPageRecipes: ctrlWrapper(getMainPageRecipes),
  getRecipesByName: ctrlWrapper(getRecipesByName)
};
