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
    const { name, email, password, quizHistory } = req.body;
    if (!name && !email && !password) {
      return res.status(401).send('Please provide all parameters');
    }
    const user = new User({
      name,
      email,
      password,
      quizHistory,
    });
    if (user) {
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(user.password, salt);
      // user.password = hash;
      // await user.save();

      const hash = await bcrypt.hash(user.password, 10);
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

    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        const accessToken = jwt.sign(
          { userId: user._id },
          `${process.env.TOKEN_SECRET}`,
          {
            expiresIn: '24h',
          },
        );
        res.json({
          accessToken,
          user: {
            name: user.name,
            email: user.email,
            quizHistory: user.quizHistory,
            _id: user._id,
          },
        });
      } else {
        res.status(401).send('Invalid password');
      }
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

export default authRoutes;
