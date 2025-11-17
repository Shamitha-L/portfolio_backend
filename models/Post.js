const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  titles: { type: [String], required: true },
  paragraphs: { type: [String], required: true },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema, "portfolio");
