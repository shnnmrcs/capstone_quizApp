import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app';
import './styles/styles.css';
import configureStore from './configureStore';

const container = document.getElementById('root');

const root = createRoot(container);

const store = configureStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
