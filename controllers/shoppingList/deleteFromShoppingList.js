const { ShoppingList } = require("../../models");
const HttpError = require("../../routes/errors/HttpErrors");

const deleteFromShoppingList = async (req, res) => {
  const { id } = req.params;
  const result = await ShoppingList.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(400);
  }
  res.status(200).json(result);
};

module.exports = deleteFromShoppingList;
