const express = require("express");
const router = express.Router();
const {
  getPendingArticles,
  approveArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Get all pending articles
router.get("/pending", protect, admin, getPendingArticles);

// Approve an article
router.put("/articles/:id/approve", protect, admin, approveArticle);

// Delete an article
router.delete("/articles/:id", protect, admin, deleteArticle);

module.exports = router;
