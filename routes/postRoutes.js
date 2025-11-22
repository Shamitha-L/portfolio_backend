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


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      message: "Posts fetched successfully",
      posts: posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Error",
      details: err.message
    });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    res.json({
      message: "Post fetched successfully",
      post: post
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Error",
      details: err.message
    });
  }
});




module.exports = router;
