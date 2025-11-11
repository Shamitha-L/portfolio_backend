const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,   // stored filename
  video: String,   // stored filename
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
