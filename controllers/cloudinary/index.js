const ctrlWrapper = require("../ctrlWrapper");

const saveImages = require("./saveImages");
const updateAvatar = require("./updateAvatar");
module.exports = {
  saveImages: ctrlWrapper(saveImages),
  updateAvatar: ctrlWrapper(updateAvatar),
};
