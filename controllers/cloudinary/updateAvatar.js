const cloudinary = require("cloudinary").v2;
const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  const result = await cloudinary.uploader.upload(req.file.path);
  const updatedAvatarUrl = result.secure_url;
  await User.findByIdAndUpdate(_id, { avatarURL: updatedAvatarUrl, name: name });
  res.json({ updatedAvatarUrl, name });
};
module.exports = updateAvatar;
