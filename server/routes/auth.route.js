/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import express from 'express';

const bcrypt = require('bcrypt');

const dotenv = require('dotenv');

const jwt = require('jsonwebtoken');

const authRoutes = express.Router();

const User = require('../models/user.model');

dotenv.config();

authRoutes.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(401).send('Please provide all parameters');
    }
    const user = new User({
      name,
      email,
      password,
    });
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;

      await user.save();
      const accessToken = jwt.sign(
        { userId: user._id },
        `${process.env.TOKEN_SECRET}`,
        {
          expiresIn: '24h',
        },
      );
      res.json({ accessToken, user });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

authRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send('Invalid user id, Please check credentials provided');
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      const accessToken = jwt.sign(
        { userId: user._id },
        `${process.env.TOKEN_SECRET}`,
        {
          expiresIn: '24h',
        },
      );
      res.json({ accessToken, user });
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

export default authRoutes;
