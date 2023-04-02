const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "avatars",
//   allowedFormats: ["jpg", "png"],
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const uploadCloud = multer({ storage });

module.exports = cloudinary;
