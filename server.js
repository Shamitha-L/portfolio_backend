const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/posts", postRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on port", process.env.PORT)
);
