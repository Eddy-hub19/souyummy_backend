const { Recipe } = require("../../models/index");

const { HttpError } = require("../../routes/errors/HttpErrors");
const getRecipeIngredients = require("../../utils/getIngredientsForRecipe");

const getFavorites = async (req, res) => {
  const { favorite, name } = req.user;

  if (favorite.length <= 0) {
    throw HttpError(404, `User ${name} dont have any favorite recepies`);
  }

  const data = await Recipe.find({ _id: { $in: favorite } });

  const result = await Promise.all(
    data.map(async (r) => {
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
    status: `succes, we have found ${result.length} position(s)`,
    code: 201,
    result,
  });
};

module.exports = getFavorites;
