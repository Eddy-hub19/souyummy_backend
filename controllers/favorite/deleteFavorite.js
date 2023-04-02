const { PopularFoods } = require('../../models/popularFoods')
const { User } = require('../../models/users')
const { httpError } = require('../../routes/errors/HttpErrors')

const deleteFavorite = async (req, res) => {
  const { idFood } = req.params
  const userId = req.user._id

  const popularFood = await PopularFoods.findOne({
    idFood,
    users: userId,
  })

  if (!popularFood) {
    throw httpError(404, `The food is not found`)
  }
  await User.updateOne(
    { _id: userId },
    { $pull: { favoriteFoods: { foodId: popularFood._id } } },
  )

  if (popularFood.users.length === 1) {
    await PopularFoods.deleteOne({
      idFood,
      users: userId,
    })
  } else {
    await PopularFoods.findOneAndUpdate(
      { idFood, users: userId },
      { $pull: { users: userId } },
    )
  }
  res.json({
    // id: idFood,
    message: 'food deleted',
  })
}

module.exports = deleteFavorite
