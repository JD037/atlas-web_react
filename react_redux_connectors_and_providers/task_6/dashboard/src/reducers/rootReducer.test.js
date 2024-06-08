// // src/reducers/rootReducer.js

import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import courseReducer from './courseReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  courses: courseReducer,
  notifications: notificationReducer,
});

export default rootReducer;
