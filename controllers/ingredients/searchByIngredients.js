const { Recipe } = require("../../models/recipes");

// Здійснюємо пошук рецептів за інгрідієнтом
const searchRecipesByIngredient = async (req, res) => {
  const { ingredient } = req.query;
  try {
    // Пошук рецептів за інгредієнтом
    const recipes = await Recipe.find({ ingredients: { $regex: ingredient }.populate("ttl", "desc") });

    res.send(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
module.exports = searchRecipesByIngredient;
