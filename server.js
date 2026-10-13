const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory posts store
let posts = [
  {
    id: 1,
    title: "Welcome to Our New Developer Blog",
    content: "This is our inaugural post exploring full-stack engineering, clean code architecture, and agentic workflows.",
    author: "Admin",
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    title: "Mastering Modern Web Architecture",
    content: "Building modular, fault-tolerant applications requires deliberate design patterns and reliable continuous integration.",
    author: "Sarah",
    date: new Date().toLocaleDateString()
  }
];

// Mock login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  // Accepts demo login
  return res.json({
    success: true,
    user: { username, role: "Author" },
    token: "mock-jwt-token-" + Date.now()
  });
});

// Get posts
app.get('/api/posts', (req, res) => {
  res.json({ posts });
});

// Create post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author: author || "Anonymous",
    date: new Date().toLocaleDateString()
  };
  posts.unshift(newPost);
  res.status(201).json({ success: true, post: newPost });
});

app.listen(PORT, () => {
  console.log(`Blog server running at http://localhost:${PORT}`);
});