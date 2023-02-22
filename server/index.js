import express from 'express';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Routes from './routes';

dotEnv.config();

const mongoSting = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect(mongoSting);
const db = mongoose.connection;
const app = express();

app.get('/', (req, res) => {
  res.send('hello wold');
});

Routes.initRoutes(app);

db.on('error', error => {
  console.log(error);
});
db.once('connected', () => {
  console.log('Database Connected');
});

app.listen(port, () => {
  console.log(`Server has started: You are listening to PORT '${port}'`);
});
