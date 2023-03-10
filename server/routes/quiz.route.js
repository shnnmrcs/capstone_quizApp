/* eslint-disable consistent-return */
import express from 'express';
import verifyToken from '../middlewares/verifyToken';

const quizRouter = express.Router();

const Quiz = require('../models/quiz.model');

quizRouter.post('/add', async (req, res) => {
  try {
    const { testID, userID, dateTaken, answers, questions } = req.body;
    if (!testID || !userID || !dateTaken) {
      return res.status(401).send('Please provide all parameters');
    }

    const result = questions.reduce(
      (previous, current, index) => {
        if (current.answer === answers[index]) {
          const score = current.weight + previous.score;
          const correct = previous.correct + 1;
          return { ...previous, score, correct };
        }
        return previous;
      },
      { score: 0, correct: 0 },
    );

    const quiz = new Quiz({
      testID,
      userID,
      score: result.score,
      dateTaken,
    });
    if (quiz) {
      await quiz.save();

      res.json(result);
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
