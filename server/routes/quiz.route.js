/* eslint-disable consistent-return */
import express from 'express';
import verifyToken from '../middlewares/verifyToken';

const quizRouter = express.Router();

const Quiz = require('../models/quiz.model');

quizRouter.post('/add', async (req, res) => {
  try {
    const { testID, userID, score, dateTaken } = req.body;
    if (!testID || !userID || !score || !dateTaken) {
      return res.status(401).send('Please provide all parameters');
    }
    const quiz = new Quiz({
      testID,
      userID,
      score,
      dateTaken,
    });
    if (quiz) {
      await quiz.save();

      res.json(quiz);
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

quizRouter.get('/getAllUserQuiz/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Quiz.find(
      { userID: id },
      { _id: 1, testID: 1, userID: 1, score: 1, dateTaken: 1 },
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json('No Quiz Found.');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

export default quizRouter;
