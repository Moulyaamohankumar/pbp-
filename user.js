const express = require('express');
const router = express.Router();

let users = [
  { email: "user1@gmail.com", password: "user1" },
  { email: "user2@gmail.com", password: "user2" },
  { email: "user3@gmail.com", password: "user3" }
];

// Create a new user
router.post('/user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    users.push({ email, password });
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  res.json(users);
});

// Update a user's password
router.put('/user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const userToUpdate = users.find(u => u.email === email);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    userToUpdate.password = password;
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a user
router.delete('/user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
      users.splice(index, 1);
      return res.json({ message: 'User deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'Email not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
