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
