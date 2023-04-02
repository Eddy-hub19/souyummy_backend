const ctrlWrapper = require("../ctrlWrapper");

const { saveImages } = require("./saveImages");
module.exports = { saveImages: ctrlWrapper(saveImages) };
