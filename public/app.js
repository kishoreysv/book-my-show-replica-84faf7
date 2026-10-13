let currentUser = null;
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

function init() {
  const saved = localStorage.getItem("devnotes_user");
  if (saved) {
    currentUser = JSON.parse(saved);
  }
  updateUI();
  renderPosts();
}

function updateUI() {
  const authBtn = document.getElementById("auth-btn");
  const greeting = document.getElementById("user-greeting");
  const createSection = document.getElementById("create-post-section");

  if (currentUser) {
    authBtn.textContent = "Sign Out";
    authBtn.onclick = handleSignOut;
    greeting.textContent = `Signed in as @${currentUser.username}`;
    greeting.classList.remove("hidden");
    createSection.classList.remove("hidden");
  } else {
    authBtn.textContent = "Sign In";
    authBtn.onclick = toggleAuthModal;
    greeting.classList.add("hidden");
    createSection.classList.add("hidden");
  }
}

function toggleAuthModal() {
  const modal = document.getElementById("auth-modal");
  modal.classList.toggle("hidden");
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (!username) return;

  currentUser = { username, role: "Author" };
  localStorage.setItem("devnotes_user", JSON.stringify(currentUser));
  toggleAuthModal();
  updateUI();
}

function handleSignOut() {
  currentUser = null;
  localStorage.removeItem("devnotes_user");
  updateUI();
}

function handleCreatePost(e) {
  e.preventDefault();
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  if (!title || !content) return;

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author: currentUser ? currentUser.username : "Anonymous",
    date: new Date().toLocaleDateString()
  };

  posts.unshift(newPost);
  document.getElementById("post-form").reset();
  renderPosts();
}

function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = posts.map(p => `
    <article class="post-card">
      <h3>${p.title}</h3>
      <div class="post-meta">By <strong>@${p.author}</strong> on ${p.date}</div>
      <p>${p.content}</p>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", init);