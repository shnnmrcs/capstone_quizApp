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
    const response = await Test.find({});
    if (response) {
      const newReponse = response.reduce((p, c) => {
        const newObj = {
          _id: c._id,
          name: c.name,
          totalWeight: c.totalWeight,
          questionsList: c.questionsList
        };
        p.push(newObj);
        return p;
      }, []);
      res.status(200).json(newReponse);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default testsRouter;
