// server/models/Article.js
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // New articles are 'pending' by default, awaiting admin approval [cite: 4]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
