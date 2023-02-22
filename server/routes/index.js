import testsRouter from './tests.route';
import usersRouter from './users.route';

export default class Routes {
  static initRoutes(app) {
    app.get('/', (req, res) => {
      res.send('hello wold');
    });

    app.use('/api/users', usersRouter);
    app.use('/api/tests', testsRouter);
  }
}
