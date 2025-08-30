const Article = require("../models/Article");

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private
exports.createArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newArticle = new Article({
      title,
      content,
      author: req.user.id, // We get this from the 'protect' middleware
    });

    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get articles for the logged-in user
// @route   GET /api/articles/my-articles
// @access  Private
exports.getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// ADD THESE NEW FUNCTIONS TO articleController.js

// @desc    Get all APPROVED articles
// @route   GET /api/articles
// @access  Public
exports.getApprovedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "approved" }).populate(
      "author",
      "username"
    );
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get all PENDING articles (for admin)
// @route   GET /api/admin/pending
// @access  Admin
exports.getPendingArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "pending" }).populate(
      "author",
      "username"
    );
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Approve an article
// @route   PUT /api/admin/articles/:id/approve
// @access  Admin
exports.approveArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    article.status = "approved";
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete an article
// @route   DELETE /api/admin/articles/:id
// @access  Admin
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    await article.deleteOne(); // Use deleteOne() on the document
    res.json({ msg: "Article removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
