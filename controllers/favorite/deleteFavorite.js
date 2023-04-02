const { User } = require("../../models/users");

const { HttpError } = require("../../routes/errors/HttpErrors");

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const user = await User.findOne({ _id: _id });

  if (!user) {
    throw HttpError(401, "Unauthorized");
  }

  if (!user.favorite.includes(id)) {
    throw HttpError(404, `Sorry we couldnt find recepie with id ${id} in ${user.name} favorites`);
  }

  user.favorite.pull(id);
  await user.save();

  res.status(201).json({
    status: `Succes, recipe with id: ${id} was deleted from ${user.name} favorites`,
    code: 201,
  });
};

module.exports = deleteFavorite;
