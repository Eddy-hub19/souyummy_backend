const { mongoose } = require('mongoose')
const { User } = require('../../models')
const { PopularFoods } = require('../../models/popularFoods')
const { Recipe } = require('../../models/recipes')
const { fetchRecipeById } = require('../../services')

const addFavorite = async (req, res) => {
  const { idFood: idRecipe } = req.body
  const { _id } = req.user

  let isPopular = await PopularFoods.findOneAndUpdate(
    { idFood: idRecipe },
    { $addToSet: { users: _id } },
  )

  if (idRecipe.toString().length < 0) {
    const { foods } = await fetchRecipeById(idRecipe)

    const { idFood, strFood, strInstructions, strFoodThumb } = foods[0]

    if (!isPopular) {
      isPopular = await PopularFoods.create({
        idFood,
        strFood,
        strInstructions,
        strFoodThumb,
        users: [_id],
      })
    }
  } else {
    const { title, description, imgURL } = await Recipe.findOne({
      _id: idRecipe,
      owner: _id,
    })
    if (!isPopular) {
      isPopular = await PopularFoods.create({
        idFood: idRecipe,
        strFood: title,
        strInstructions: description,
        strFoodThumb: imgURL,
        users: [_id],
      })
    }
  }

  if (isPopular) {
    const newFavoriteRecipe = {
      foodId: mongoose.Types.ObjectId(isPopular._id),
      addedOn: new Date(),
    }

    await User.findOneAndUpdate(
      { _id },
      { $addToSet: { favoriteFoods: newFavoriteRecipe } },
    )
  }

  res.status(201).json({ message: 'Added to favorite' })
}

module.exports = addFavorite
