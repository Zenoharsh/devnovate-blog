const express = require("express");
const router = express.Router();
const {
  createArticle,
  getMyArticles,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new article. The 'protect' middleware runs first.
router.route("/").post(protect, createArticle);

// Route for a user to get all of their own articles.
router.route("/my-articles").get(protect, getMyArticles);

module.exports = router;
