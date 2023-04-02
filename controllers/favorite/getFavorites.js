const { mongoose } = require('mongoose')
const { setPaginationSlice } = require('../../helpers')
const { User } = require('../../models/users')
const { HttpError } = require('../../routes/errors/HttpErrors')

const getFavorites = async (req, res) => {
  const { _id } = req.user

  const data = await User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(_id) },
    },
    {
      $project: {
        favoriteFoods: 1,
        _id: 0,
      },
    },
    {
      $unwind: '$favoriteFoods',
    },
    {
      $lookup: {
        from: 'popularfoods',
        localField: 'favoriteFoods.foodId',
        foreignField: '_id',
        as: 'foodInfo',
      },
    },
    {
      $unwind: '$foodInfo',
    },
    {
      $project: {
        idFood: '$foodInfo.idFood',
        addedOn: '$favoriteFoods.addedOn',
        strFood: '$foodInfo.strFood',
        strInstructions: '$foodInfo.strInstructions',
        strFoodThumb: '$foodInfo.strFoodThumb',
      },
    },
    {
      $sort: { addedOn: -1 },
    },
  ])

  const { page = 1, per_page = data.length } = req.query

  if (data.length === 0) {
    return res.json({ totalHits: 0, foods: [] })
  }

  const pagination = setPaginationSlice(page, per_page, data.length)
  if (!pagination) {
    throw HttpError(400, 'Incorrect params of pagination')
  }

  res.json({
    totalHits: data.length,
    foods: data.slice(pagination.start, pagination.end),
  })
}

module.exports = getFavorites
