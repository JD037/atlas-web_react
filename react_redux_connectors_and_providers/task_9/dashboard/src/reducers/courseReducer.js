// src/reducers/courseReducer.js

import { FETCH_COURSES_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
  courses: {},
});

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES_SUCCESS:
      return state.set('courses', fromJS(action.data.entities.courses));
    case SELECT_COURSE:
      return state.setIn(['courses', action.index, 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn(['courses', action.index, 'isSelected'], false);
    default:
      return state;
  }
};

export default courseReducer;
