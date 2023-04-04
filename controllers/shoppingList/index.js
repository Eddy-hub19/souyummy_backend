const ctrlWrapper = require("../ctrlWrapper");
const getShoppingList = require("./getShoppingList");
const addToShoppingList = require("./addToShoppingList");
const deleteFromShoppingList = require("./deleteFromShoppingList.js");

module.exports = {
  getShoppingList: ctrlWrapper(getShoppingList),
  addToShoppingList: ctrlWrapper(addToShoppingList),
  deleteFromShoppingList: ctrlWrapper(deleteFromShoppingList),
};
