const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST route
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    });

    await post.save();
    res.json({ success: true, post });
  } catch (err) {
    console.error("❌ Error saving post:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET route
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
