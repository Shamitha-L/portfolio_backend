const express = require("express");
const Post = require("../models/Post");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload, async (req, res) => {
  try {
    const { titles, paragraphs } = req.body;

    const parsedTitles = JSON.parse(titles);
    const parsedParagraphs = JSON.parse(paragraphs);

    const imageFiles = req.files["images"] || [];
    const videoFiles = req.files["videos"] || [];

    const imageUrls = imageFiles.map((f) => "/uploads/" + f.filename);
    const videoUrls = videoFiles.map((f) => "/uploads/" + f.filename);

    const newPost = new Post({
      titles: parsedTitles,
      paragraphs: parsedParagraphs,
      images: imageUrls,
      videos: videoUrls
    });

    const saved = await newPost.save();

    res.json({
      message: "Post created successfully",
      post: saved
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Error", details: err.message });
  }
});

module.exports = router;
