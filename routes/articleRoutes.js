// server/routes/articleRoutes.js
const express = require("express");
const router = express.Router();
// IMPORT THE NEW CONTROLLER FUNCTION
const {
  createArticle,
  getMyArticles,
  getApprovedArticles,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");

// ADD THIS PUBLIC ROUTE for the homepage
router.route("/").get(getApprovedArticles);

// This route is for a user creating an article
router.route("/").post(protect, createArticle);

// This route is for a user getting their own articles
router.route("/my-articles").get(protect, getMyArticles);

module.exports = router;
