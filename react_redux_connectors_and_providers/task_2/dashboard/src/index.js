// task_1/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App/App';
import ErrorBoundary from './utils/ErrorBoundary';
import uiReducer from './reducers/uiReducer';

// Create the Redux store
const store = createStore(uiReducer);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
