const ctrlWrapper = require("../ctrlWrapper");
const cloudinary = require("cloudinary").v2;
const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  const result = await cloudinary.uploader.upload(req.file.path);
  const updatedAvatarUrl = result.secure_url;
  console.log(updatedAvatarUrl);
  await User.findByIdAndUpdate(_id, { avatarURL: updatedAvatarUrl, name: name });
  res.json(updatedAvatarUrl);
};
module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
