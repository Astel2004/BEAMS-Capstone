const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserAccounts = require('../models/UserAccounts');
const jwt = require('jsonwebtoken');

// This login route works for BOTH HR and Employee roles
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Find user by email (case-sensitive)
    const user = await UserAccounts.findOne({ email: email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: 'User not found.' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // At this point, user can be HR or Employee
    // You can add more roles if needed

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // Respond with role so frontend can redirect accordingly
    res.status(200).json({ message: 'Login successful!', token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;