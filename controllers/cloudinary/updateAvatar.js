const ctrlWrapper = require("../ctrlWrapper");
const cloudinary = require("cloudinary").v2;
const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const result = await cloudinary.uploader.upload(req.file.path);
  const updatedAvatarUrl = result.secure_url;
  console.log(updatedAvatarUrl);
  await User.findByIdAndUpdate(_id, { avatarURL: updatedAvatarUrl });
  res.json(updatedAvatarUrl);
};
module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
