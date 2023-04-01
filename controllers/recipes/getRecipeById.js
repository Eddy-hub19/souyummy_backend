const { Recipe } = require("../../models/");

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Recipe.findOne({ _id: id });

  // нужно допилить result в ингридиентах не полноценная инфа

  res.json(result);
};

module.exports = getRecipeById;
