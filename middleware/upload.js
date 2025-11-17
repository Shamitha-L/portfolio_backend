const multer = require("multer");
const path = require("path");

// Ensure uploads folder exists
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  }
});

// Accept 2 fields: images[], videos[]
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
}).fields([
  { name: "images", maxCount: 20 },
  { name: "videos", maxCount: 10 }
]);

module.exports = upload;
