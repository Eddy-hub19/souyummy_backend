const ctrlWrapper = require("../ctrlWrapper");
// const getCategories = require("./getCategories");
const getRecipeById = require("./getRecipeById");
module.exports = {
  //   getCategories: ctrlWrapper(getCategories),
  getRecipeById: ctrlWrapper(getRecipeById),
};
