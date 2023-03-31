const ctrlWrapper = require("../ctrlWrapper")
const getCategories = require("./getCategories")

module.exports = {
    getCategories: ctrlWrapper(getCategories),
}
