const { User } = require("../../models/users");

const { HttpError } = require("../../routes/errors/HttpErrors");

const addFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const user = await User.findOne({ _id: _id });

  if (!user) {
    throw HttpError(401, "Unauthorized");
  }

  if (user.favorite.includes(id)) {
    throw HttpError(404, `Sorry, recipe with id: ${id} was added to ${user.name} favorites before`);
  }

  user.favorite.push(id);
  await user.save();

  res.status(201).json({
    status: `Succes, recipe with id: ${id} was added to ${user.name} favorites`,
    code: 201,
  });
};

module.exports = addFavorite;
