import React, { useState, useEffect } from "react";
import axios from "axios";

// --- STYLES (Plain CSS-in-JS for a modern blog theme) ---
const styles = {
  appContainer: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    color: "#333333",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    position: "sticky",
    top: "0",
    zIndex: 50,
    borderBottom: "1px solid #e5e7eb",
  },
  headerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#111827",
    cursor: "pointer",
    letterSpacing: "-1px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  navLink: {
    color: "#4b5563",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  container: {
    maxWidth: "1280px",
    margin: "3rem auto",
    padding: "0 2rem",
    flex: "1 0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "2.5rem",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  footer: {
    backgroundColor: "#f9fafb",
    color: "#6b7280",
    padding: "2rem",
    textAlign: "center",
    marginTop: "auto",
    borderTop: "1px solid #e5e7eb",
  },
};

// --- Custom Components for New UI ---
const Button = ({
  children,
  onClick,
  style,
  variant = "primary",
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseStyle = {
    padding: "0.6rem 1.5rem",
    borderRadius: "0.375rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
  };
  const variants = {
    primary: {
      backgroundColor: "#111827",
      color: "white",
      boxShadow: isHovered ? "0 4px 10px rgba(0,0,0,0.2)" : "none",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
      boxShadow: isHovered ? "0 4px 10px rgba(220, 38, 38, 0.3)" : "none",
    },
    secondary: { backgroundColor: "#e5e7eb", color: "#1f2937" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant], ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

const Input = ({ type = "text", value, onChange, placeholder, name }) => {
  const [isFocused, setIsFocused] = useState(false);
  const style = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#f9fafb",
    border: "2px solid",
    borderColor: isFocused ? "#111827" : "#d1d5db",
    borderRadius: "0.375rem",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.3s ease",
  };
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

const Textarea = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const style = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#f9fafb",
    border: "2px solid",
    borderColor: isFocused ? "#111827" : "#d1d5db",
    borderRadius: "0.375rem",
    color: "#111827",
    boxSizing: "border-box",
    minHeight: "200px",
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "'Poppins', sans-serif",
  };
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

// --- Reusable Components ---
const Header = ({ user, navigateTo, onLogout }) => {
  const [isHovered, setIsHovered] = useState({});
  const handleHover = (link, status) =>
    setIsHovered((prev) => ({ ...prev, [link]: status }));
  const navLinkStyle = (link) => ({
    ...styles.navLink,
    color: isHovered[link] ? "#111827" : "#4b5563",
  });

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <h1 style={styles.logo} onClick={() => navigateTo("home")}>
          BlogPress
        </h1>
        <nav style={styles.nav}>
          <a
            href="#"
            style={navLinkStyle("home")}
            onMouseEnter={() => handleHover("home", true)}
            onMouseLeave={() => handleHover("home", false)}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
          >
            Home
          </a>
          {user ? (
            <>
              {user.role === "admin" && (
                <a
                  href="#"
                  style={navLinkStyle("admin")}
                  onMouseEnter={() => handleHover("admin", true)}
                  onMouseLeave={() => handleHover("admin", false)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("admin");
                  }}
                >
                  Admin
                </a>
              )}
              <a
                href="#"
                style={navLinkStyle("create")}
                onMouseEnter={() => handleHover("create", true)}
                onMouseLeave={() => handleHover("create", false)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("create");
                }}
              >
                Create Post
              </a>
              <a
                href="#"
                style={navLinkStyle("profile")}
                onMouseEnter={() => handleHover("profile", true)}
                onMouseLeave={() => handleHover("profile", false)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("profile");
                }}
              >
                {user.name}
              </a>
              <Button onClick={onLogout} variant="danger">
                Logout
              </Button>
            </>
          ) : (
            <>
              <a
                href="#"
                style={navLinkStyle("login")}
                onMouseEnter={() => handleHover("login", true)}
                onMouseLeave={() => handleHover("login", false)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("login");
                }}
              >
                Login
              </a>
              <Button onClick={() => navigateTo("signup")}>Signup</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer style={styles.footer}>
    <p>&copy; {new Date().getFullYear()} BlogPress. All rights reserved.</p>
  </footer>
);

// --- Page Components ---
const HomePage = ({ posts, searchTerm, setSearchTerm, navigateTo }) => {
  const filteredPosts = posts.filter(
    (p) =>
      p.status === "published" &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const PostCard = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardStyle = {
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: isHovered
        ? "0 8px 20px rgba(0,0,0,0.12)"
        : "0 2px 8px rgba(0,0,0,0.06)",
      transform: isHovered ? "translateY(-5px)" : "translateY(0)",
      display: "flex",
      flexDirection: "column",
    };
    return (
      <div
        style={cardStyle}
        onClick={() => navigateTo("post", post._id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/e5e7eb/333333?text=Image";
          }}
        />
        <div
          style={{
            padding: "1.5rem",
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            {post.title}
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            By {post.author.name} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p
            style={{
              color: "#4b5563",
              marginBottom: "1rem",
              lineHeight: "1.6",
              flex: "1 0 auto",
            }}
          >
            {post.content.substring(0, 100)}...
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#6b7280",
              marginTop: "auto",
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <span>👍 {post.likes?.length || 0}</span>
            <span>💬 {post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          padding: "3rem 1rem",
        }}
      >
        <h1
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "3.5rem",
            fontWeight: "bold",
          }}
        >
          Welcome to BlogPress
        </h1>
        <p
          style={{
            color: "#6b7280",
            marginTop: "1rem",
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "1rem auto 0",
          }}
        >
          Your source for the latest in web development and technology.
        </p>
      </div>
      <div
        style={{
          marginBottom: "3rem",
          maxWidth: "768px",
          margin: "0 auto 3rem",
        }}
      >
        <Input
          placeholder="Search for articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <main>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

const PostPage = ({ post, onLike, onComment, navigateTo }) => {
  const [commentText, setCommentText] = useState("");
  if (!post)
    return (
      <div style={{ textAlign: "center", marginTop: "5rem", fontSize: "2rem" }}>
        Post not found.{" "}
        <Button onClick={() => navigateTo("home")}>Go Home</Button>
      </div>
    );
  return (
    <div style={{ ...styles.container, maxWidth: "800px" }}>
      <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <div style={{ padding: "2.5rem" }}>
          <h1
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "2.75rem",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "0.5rem",
              lineHeight: "1.2",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "2rem" }}
          >
            By {post.author.name} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div
            style={{
              color: "#333333",
              lineHeight: "1.8",
              whiteSpace: "pre-wrap",
              fontSize: "1.1rem",
            }}
          >
            {post.content}
          </div>
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Button onClick={() => onLike(post._id)} variant="secondary">
              👍 {post.likes?.length || 0} Like
            </Button>
          </div>
        </div>
      </div>
      <div style={{ ...styles.card, marginTop: "2rem" }}>
        <h3
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Comments ({post.comments?.length || 0})
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onComment(post._id, commentText);
            setCommentText("");
          }}
          style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
        >
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button type="submit">Submit</Button>
        </form>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "1rem",
                }}
              >
                <p style={{ fontWeight: "600", color: "#111827" }}>
                  {comment.user?.name || "User"}
                </p>
                <p style={{ color: "#4b5563" }}>{comment.text}</p>
              </div>
            ))
          ) : (
            <p>Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthForm = ({ isLogin, onSubmit, navigateTo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      onSubmit(formData);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div style={{ ...styles.container, maxWidth: "450px" }}>
      <div style={styles.card}>
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#111827",
            marginBottom: "2rem",
          }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        {error && (
          <p
            style={{
              color: "#dc2626",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {!isLogin && (
            <div>
              <label
                style={{
                  marginBottom: "0.5rem",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Name
              </label>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div>
            <label
              style={{
                marginBottom: "0.5rem",
                display: "block",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginBottom: "0.5rem",
                display: "block",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            style={{ marginTop: "1rem", padding: "0.75rem" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p
          style={{ textAlign: "center", color: "#6b7280", marginTop: "1.5rem" }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => navigateTo(isLogin ? "signup" : "login")}
            style={{
              color: "#111827",
              fontWeight: "600",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

const CreatePostPage = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div style={{ ...styles.container, maxWidth: "768px" }}>
      <div style={styles.card}>
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          Create a New Post
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "2rem",
          }}
        >
          Your post will be submitted for admin approval.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreatePost({ title, content });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                marginBottom: "0.5rem",
                display: "block",
                fontWeight: "500",
              }}
            >
              Title
            </label>
            <Input
              placeholder="Your amazing title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginBottom: "0.5rem",
                display: "block",
                fontWeight: "500",
              }}
            >
              Content
            </label>
            <Textarea
              placeholder="Write your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            style={{ padding: "0.75rem", marginTop: "1rem" }}
          >
            Submit for Approval
          </Button>
        </form>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, posts, onDeletePost }) => {
  if (!user) return null;
  const userPosts = posts.filter((p) => p.author._id === user.id);
  const statusStyle = {
    published: { color: "#16a34a", fontWeight: "600" },
    pending: { color: "#f59e0b", fontWeight: "600" },
    rejected: { color: "#dc2626", fontWeight: "600" },
  };
  return (
    <div style={{ ...styles.container, maxWidth: "1024px" }}>
      <div style={styles.card}>
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          My Profile
        </h2>
        <p style={{ fontSize: "1.25rem", color: "#333333" }}>{user.name}</p>
        <p style={{ color: "#6b7280" }}>{user.email}</p>
        <h3
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.75rem",
            fontWeight: "bold",
            color: "#111827",
            marginTop: "2.5rem",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "2rem",
          }}
        >
          My Articles
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div
                key={post._id}
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "1rem 1.5rem",
                  borderRadius: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div>
                  <h4>{post.title}</h4>
                  <p style={{ color: "#6b7280" }}>
                    Status:{" "}
                    <span style={statusStyle[post.status]}>
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <Button
                    onClick={() => onDeletePost(post._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>You have not submitted any articles yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ posts, onUpdateStatus }) => {
  return (
    <div style={{ ...styles.container, maxWidth: "1024px" }}>
      <div style={styles.card}>
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "2rem",
          }}
        >
          Admin Dashboard
        </h2>
        {["pending", "published"].map((statusType) => (
          <div key={statusType}>
            <h3
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: statusType === "pending" ? "#f59e0b" : "#16a34a",
                marginBottom: "1rem",
                marginTop: "2rem",
                borderTop: "1px solid #e5e7eb",
                paddingTop: "2rem",
              }}
            >
              {statusType === "pending"
                ? "Pending Approval"
                : "Published Articles"}
            </h3>
            {posts
              .filter((p) => p.status === statusType)
              .map((post) => (
                <div
                  key={post._id}
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h4>{post.title}</h4>{" "}
                  <p style={{ color: "#6b7280" }}>by {post.author.name}</p>
                  {statusType === "pending" && (
                    <p style={{ margin: "1rem 0", color: "#4b5563" }}>
                      {post.content.substring(0, 200)}...
                    </p>
                  )}
                  <div style={{ marginTop: "1rem" }}>
                    {statusType === "pending" ? (
                      <>
                        <Button
                          onClick={() => onUpdateStatus(post._id, "published")}
                          style={{
                            marginRight: "0.5rem",
                            backgroundColor: "#16a34a",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => onUpdateStatus(post._id, "rejected")}
                          variant="danger"
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => onUpdateStatus(post._id, "deleted")}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  // PASTE THIS ENTIRE BLOCK IN ITS PLACE

  const [page, setPage] = useState({ name: "home", id: null }); // <-- THIS IS THE MISSING LINE
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/articles");
        console.log("API RESPONSE DATA:", response.data);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const navigateTo = (pageName, id = null) => setPage({ name: pageName, id });

  const handleLogin = (data) => {
    if (data.email === "admin@example.com" && data.password === "admin123") {
      setCurrentUser({
        id: "101",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      });
      navigateTo("home");
      return;
    }
    if (data.email === "user@example.com" && data.password === "user123") {
      setCurrentUser({
        id: "102",
        name: "Nandini Sharma",
        email: "user@example.com",
        role: "user",
      });
      navigateTo("home");
      return;
    }
    throw new Error("Invalid credentials.");
  };

  const handleSignup = (data) => {
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: "user",
    };
    setCurrentUser(newUser);
    alert("Signup successful! You are now logged in.");
    navigateTo("home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo("home");
  };

  const handleCreatePost = (data) => {
    const newPost = {
      _id: Date.now().toString(),
      ...data,
      author: { _id: currentUser.id, name: currentUser.name },
      status: "pending",
      createdAt: new Date(),
      likes: [],
      comments: [],
      imageUrl: `https://placehold.co/600x400/a78bfa/ffffff?text=${
        data.title.split(" ")[0] || "New"
      }`,
    };
    setPosts((prev) => [...prev, newPost]);
    alert("Post submitted for approval!");
    navigateTo("profile");
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleUpdatePostStatus = (id, status) => {
    if (status === "deleted") {
      if (window.confirm("Permanently delete this article?")) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
      }
    } else {
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    }
  };

  const handleLikePost = (id) => {
    if (!currentUser) {
      alert("Please login to like posts.");
      return navigateTo("login");
    }
    setPosts((prev) =>
      prev.map((p) => {
        if (p._id === id) {
          const liked = p.likes.includes(currentUser.id);
          const newLikes = liked
            ? p.likes.filter((userId) => userId !== currentUser.id)
            : [...p.likes, currentUser.id];
          return { ...p, likes: newLikes };
        }
        return p;
      })
    );
  };

  const handleCommentOnPost = (id, text) => {
    if (!currentUser) {
      alert("Please login to comment.");
      return navigateTo("login");
    }
    const newComment = { user: { name: currentUser.name }, text };
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
  };

  const renderPage = () => {
    if (isLoading)
      return (
        <div
          style={{ textAlign: "center", marginTop: "5rem", fontSize: "2rem" }}
        >
          Loading...
        </div>
      );
    const props = { navigateTo, posts, currentUser };
    switch (page.name) {
      case "home":
        return (
          <HomePage
            {...props}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        );
      case "post":
        return (
          <PostPage
            {...props}
            post={posts.find((p) => p._id === page.id)}
            onLike={handleLikePost}
            onComment={handleCommentOnPost}
          />
        );
      case "login":
        return <AuthForm {...props} isLogin={true} onSubmit={handleLogin} />;
      case "signup":
        return <AuthForm {...props} isLogin={false} onSubmit={handleSignup} />;
      case "create":
        return currentUser ? (
          <CreatePostPage {...props} onCreatePost={handleCreatePost} />
        ) : (
          <AuthForm {...props} isLogin={true} onSubmit={handleLogin} />
        );
      case "profile":
        return currentUser ? (
          <ProfilePage
            {...props}
            user={currentUser}
            onDeletePost={handleDeletePost}
          />
        ) : (
          <AuthForm {...props} isLogin={true} onSubmit={handleLogin} />
        );
      case "admin":
        return currentUser?.role === "admin" ? (
          <AdminDashboard {...props} onUpdateStatus={handleUpdatePostStatus} />
        ) : (
          <HomePage
            {...props}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        );
      default:
        return (
          <HomePage
            {...props}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        );
    }
  };

  return (
    <div style={styles.appContainer}>
      <Header
        user={currentUser}
        navigateTo={navigateTo}
        onLogout={handleLogout}
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
