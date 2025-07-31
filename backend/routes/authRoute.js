const express = require('express');
const router = express.Router();
const connection = require('../db');

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ success: false, message: 'Username and password are required.' });
  }
  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) return res.status(500).send({ success: false, error: err.message });
    res.send({ success: true, userId: result.insertId });
  });
});


// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) res.send({ success: true, userId: results[0].id });
    else res.send({ success: false });
  });
});

module.exports = router;
