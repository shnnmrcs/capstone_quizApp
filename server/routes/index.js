import usersRouter from './users.route';
import authRouter from './auth.route';
import testsRouter from './tests.route';
import quizRouter from './quiz.route';

export default class Routes {
  static initRoutes(app) {
    app.use('/api/users', usersRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/tests', testsRouter);
    app.use('/api/quiz', quizRouter);
  }
}
