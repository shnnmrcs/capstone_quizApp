import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/rootSaga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [sagaMiddleware];
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
