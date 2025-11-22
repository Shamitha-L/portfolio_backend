const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// serve uploaded files

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/posts", postRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
