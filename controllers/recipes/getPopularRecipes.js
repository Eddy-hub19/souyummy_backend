const { Recipe } = require("../../models");

const { HttpError } = require("../../routes/errors/HttpErrors");
const getRecipeIngredients = require("../../utils/getIngredientsForRecipe");

const getPopularRecipes = async (req, res) => {
  const filter = {};
  const allRecipes = await Recipe.find(filter).sort("-popularity").limit(10);

  if (!allRecipes) {
    throw HttpError(404, `Unfortunately there are no popular recipes at the moment`);
  }

  const result = await Promise.all(
    allRecipes.map(async (r) => {
      return {
        imgURL: r.imgURL,
        _id: r._id,
        title: r.title,
        category: r.category,
        area: r.area,
        instructions: r.instructions,
        description: r.description,
        thumb: r.thumb,
        preview: r.preview,
        time: r.time,
        popularity: r.popularity,
        favorites: r.favorites,
        likes: r.likes,
        youtube: r.youtube,
        tags: r.tags,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        ingredients: await getRecipeIngredients(r.ingredients),
      };
    })
  );
  res.status(201).json({
    status: `succes, here is ${allRecipes.length} position(s)`,
    code: 201,
    result: result,
  });
};

module.exports = getPopularRecipes;
