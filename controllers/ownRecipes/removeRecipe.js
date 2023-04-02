const { Recipe } = require("../../models/index");
const { HttpError } = require("../../helpers/index");
// ======================================================= //
const removeRecipe = async (req, res, next) => {
  const result = await Recipe.findByIdAndDelete({ _id: req.params.recipeId });

  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.status(200).json({ message: "Recipe deleted" });
};
// ======================================================= //

module.exports = removeRecipe;
