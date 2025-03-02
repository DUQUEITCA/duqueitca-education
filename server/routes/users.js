const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created', users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Logged in', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;