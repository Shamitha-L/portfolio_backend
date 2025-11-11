const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Post");

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE POST (With Image/Video)
router.post("/", upload.fields([{ name: "image" }, { name: "video" }]), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.files.image ? req.files.image[0].filename : null,
      video: req.files.video ? req.files.video[0].filename : null
    });

    await post.save();
    res.json({ success: true, post });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
