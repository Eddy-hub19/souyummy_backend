const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isIdValId = (req, res, next) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    next(HttpError(400), `${recipeId} is not valid id`);
  }

  next();
};

module.exports = isIdValId;
