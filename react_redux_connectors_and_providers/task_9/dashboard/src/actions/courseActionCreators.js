// src/actions/courseActionCreators.js

import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSES_SUCCESS } from './courseActionTypes';
import { bindActionCreators } from 'redux';
import { normalize, schema } from 'normalizr';

const courseSchema = new schema.Entity('courses');
const coursesSchema = [courseSchema];

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index,
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index,
});

export const setCourses = (data) => {
  const normalizedData = normalize(data, coursesSchema);
  return {
    type: FETCH_COURSES_SUCCESS,
    data: normalizedData,
  };
};

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/courses.json');
      const data = await response.json();
      dispatch(setCourses(data));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
};

export const boundSelectCourse = (dispatch) => bindActionCreators(selectCourse, dispatch);
export const boundUnSelectCourse = (dispatch) => bindActionCreators(unSelectCourse, dispatch);
