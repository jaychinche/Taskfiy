const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

const connection = require("./db");

// DB init (run once)
const initSQL = `
  CREATE DATABASE IF NOT EXISTS taskify;
  USE taskify;
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id INT
  );
`;
connection.query(initSQL, (err) => {
  if (err) {
    console.error('❌ Error during DB initialization:', err.message);
    process.exit(1);
  }
  console.log('✅ Database & Tables are ready.');
});

// Routes
app.use('/api', require('./routes/authRoute'));

// Auth Routes
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ success: false, message: "Username and password are required." });
  }
  connection.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result) => {
    if (err) return res.status(500).send({ success: false, error: err.message });
    res.send({ success: true, userId: result.insertId });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) res.send({ success: true, userId: results[0].id });
    else res.send({ success: false });
  });
});

// Todo Routes

app.post("/api/todos", (req, res) => {
  const { title, userId } = req.body;
  connection.query("INSERT INTO todos (title, user_id) VALUES (?, ?)", [title, userId], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

app.get("/api/todos/:userId", (req, res) => {
  connection.query("SELECT * FROM todos WHERE user_id = ?", [req.params.userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.delete("/api/todos/:id", (req, res) => {
  connection.query("DELETE FROM todos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});


// Fetch all users
app.get("/users", (req, res) => {
  connection.query("SELECT username, password FROM users", (err, results) => {
    if (err) {
      return res.status(500).send({ success: false, error: err.message });
    }
    res.send({ success: true, users: results });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
