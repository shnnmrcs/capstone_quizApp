import express from 'express';

const testsRouter = express.Router();

testsRouter.get('/getAll', (req, res) => {
  res.send('tests route');
});

testsRouter.get('/getOne/:id', (req, res) => {
  res.send('test route - get one');
});

testsRouter.post('/add', (req, res) => {
  res.send('test info');
});

testsRouter.put('/update/:id', (req, res) => {
  res.send('test info');
});

testsRouter.delete('/delete/:id', (req, res) => {
  res.send('test info');
});

export default testsRouter;