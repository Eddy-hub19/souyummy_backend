const ctrlWrapper = require("../ctrlWrapper");
const cloudinary = require("cloudinary").v2;
const saveImages = async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  return res.json({
    success: true,
    file: upload.secure_url,
  });
};
module.exports = { saveImages: ctrlWrapper(saveImages) };

//   const timestamp = Math.round(new Date().getTime() / 1000);
//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp,
//       folder: "menu",
//       public_id: `menu-${timestamp}`,
//     },
//     API_SECRET
//   );
