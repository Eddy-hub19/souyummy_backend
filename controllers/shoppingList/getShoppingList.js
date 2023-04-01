const { ShoppingList } = require("../../models");

const getShoppingList = async (req, res) => {
  const result = await ShoppingList.find({ userId: req.user._id }, "-userId");

  res.status(200).json(result);
};

module.exports = getShoppingList;
