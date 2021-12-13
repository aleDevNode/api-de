const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("src", "public", "uploads", "avatar"));
    console.log( path.join("src", "public", "uploads", "avatar"));
  },
  filename: (req,file,cb) => {
    console.log(file);
    cb(null, `${Date.now().toString()}-${req.body.name}.${file.originalname.split('.').pop()}`);
  },
});

const fileFilter = (req, file, cb) => {
  const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find(
    acceptedFormat => acceptedFormat == file.mimetype
  );
  if (isAccepted) return cb(null, true);
  return cb(null, false);
};

module.exports = multer({
  storage,
  fileFilter,
});
