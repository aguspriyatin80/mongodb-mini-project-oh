const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloud config
cloudinary.config({
  cloud_name: "di02ey9t7",
  api_key: "884388152998215",
  api_secret: "aCQLM6VqOr3Tt0bWcb-A1rEFCes",
});

// storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mongo-mini",
  allowedFormats: ["jpg", "jpeg", "png", "svg"],
  filename: (req, files, cb) => {
    cb(null, Date.now() + "_" + files.originalname.split(".")[0]);
  },
});

const uploader = multer({
  storage: storage,
});

module.exports = uploader;
