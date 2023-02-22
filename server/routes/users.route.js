import express from 'express';

const usersRouter = express.Router();

const User = require('../models/user.model');

usersRouter.patch('/update/:_id', async (req, res) => {
  try {
    const { quizHistory } = req.body;
    const { _id } = req.params;
    const user = await User.findByIdAndUpdate(_id, {$set:{ quizHistory }});
    res.json({
      user,
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

export default usersRouter;
