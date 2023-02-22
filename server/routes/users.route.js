import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/getAll', (req, res) => {
  res.send('user route');
});

usersRouter.get('/getOne/:id', (req, res) => {
  res.send('user route - get one');
});

usersRouter.post('/add', (req, res) => {
  res.send('user info');
});

usersRouter.put('/update/:id', (req, res) => {
  res.send('user info');
});

usersRouter.delete('/delete/:id', (req, res) => {
  res.send('user info');
});

export default usersRouter;