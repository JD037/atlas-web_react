// 0x08_react_redux_action_creator_normalizr/task_3/dashboard/src/actions/courseActionCreators.js

import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index,
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index,
});
