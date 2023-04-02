const { User } = require("../../models/users");
const { Recipe } = require("../../models/recipes");
const { HttpError } = require("../../routes/errors/HttpErrors");

const getRecipeIngredients = require("../../utils/getIngredientsForRecipe");

const getFavorites = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id: _id });

  if (!user) {
    throw HttpError(401, "Unauthorized");
  }

  if (user.favorite.length <= 0) {
    throw HttpError(409, `User ${user.name} dont have any favorite recepies`);
  }
  const result = await Recipe.find({ _id: { $in: user.favorite } });

  const ss = await Promise.all(
    result.map(async (r) => {
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

  console.log(ss);

  res.status(201).json({
    status: `succes, we have found ${result.length} position(s)`,
    code: 201,
    result: ss,
  });
};

module.exports = getFavorites;
