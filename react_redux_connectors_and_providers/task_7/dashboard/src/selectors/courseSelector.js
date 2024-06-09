// src/selectors/courseSelector.js

import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getCourses = (state) => state.courses.get('courses', Map());

export const getListCourses = createSelector(
  getCourses,
  (courses) => courses.valueSeq().toList()
);
