const { Recipe } = require("../../models/");

const { HttpError } = require("../../routes/errors/HttpErrors");
const getRecipeIngredients = require("../../utils/getIngredientsForRecipe");

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recepipe = await Recipe.findOne({ _id: id });

  if (!recepipe) {
    throw HttpError(404, `There is no recipe with id: ${id}`);
  }

  const result = {
    imgURL: recepipe.imgURL,
    _id: recepipe._id,
    title: recepipe.title,
    category: recepipe.category,
    area: recepipe.area,
    instructions: recepipe.instructions,
    description: recepipe.description,
    thumb: recepipe.thumb,
    preview: recepipe.preview,
    time: recepipe.time,
    popularity: recepipe.popularity,
    favorites: recepipe.favorites,
    likes: recepipe.likes,
    youtube: recepipe.youtube,
    tags: recepipe.tags,
    createdAt: recepipe.createdAt,
    updatedAt: recepipe.updatedAt,
    ingredients: [...(await getRecipeIngredients(recepipe.ingredients))],
  };

  res.json(result);
};

module.exports = getRecipeById;
