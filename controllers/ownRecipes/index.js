const ctrlWrapper = require("../ctrlWrapper")
const addRecipe = require("./addRecipe")
const removeRecipe = require("./removeRecipe")

module.exports = {
    addRecipe: ctrlWrapper(addRecipe),
    removeRecipe: ctrlWrapper(removeRecipe),
}
