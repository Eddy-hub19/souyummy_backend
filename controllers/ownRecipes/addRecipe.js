const { Recipe } = require("../../models/index");
// ======================================================= //
const addRecipe = async (req, res, next) => {
  const newRecipe = await Recipe.create({
    ...req.body,
    owner: req.user._id,
  });

  res.json(newRecipe);
};
// ======================================================= //

module.exports = addRecipe;
