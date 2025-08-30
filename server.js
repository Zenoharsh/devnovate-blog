// server.js (Corrected Order)

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to Database right away
connectDB();

// Initialize the app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data in the request body
app.use("/api/articles", require("./routes/articleRoutes"));
// server.js (add this line with your other routes)
app.use("/api/admin", require("./routes/adminRoutes"));
// A test route
app.get("/", (req, res) => {
  res.send("VIBE HACK 2025 Blogging Platform API is running!");
});
const path = require("path");

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist"))); // For Vite, the build folder is 'dist'

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("VIBE HACK 2025 Blogging Platform API is running!");
  });
}
// Define Your API Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
