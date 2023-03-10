/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import verifyToken from '../middlewares/verifyToken';

const testsRouter = express.Router();

const Test = require('../models/test.model');

testsRouter.post('/add', async (req, res) => {
  try {
    const { name, totalWeight, questionsList } = req.body;
    if (!name && !totalWeight && !questionsList) {
      return res.status(401).send('Please provide all parameters');
    }
    const test = new Test({
      name,
      totalWeight,
      questionsList,
    });
    if (test) {
      await test.save();

      res.json(test);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

testsRouter.get('/getAll', verifyToken, async (req, res) => {
  try {
    const response = await Test.find(
      {},
      { name: 1, totalWeight: 1, questionsList: 1 },
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json('No Tests Found.');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

testsRouter.get('/getOne/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Test.findById(
      { _id: id },
      { questionsList: { answer: 0 }, __v: 0 },
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json('No Test Found.');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

export default testsRouter;
