const { Ingredient } = require("../../models/recipes");

const { HttpError } = require("../../routes/errors/HttpErrors");

const ingredientList = async (req, res) => {
  const filter = {};
  const result = await Ingredient.find(filter);

  if (!result) {
    throw HttpError(404, `Unfortunately there are no ingredients at the moment`);
  }

  res.json({ ingredients: result });
};

module.exports = ingredientList;
