import { fromJS, Map } from 'immutable';
import { getCourses, getListCourses } from './courseSelector';

describe('Course Selectors', () => {
  const state = fromJS({
    courses: {
      1: { id: 1, name: 'Course 1', credit: 60 },
      2: { id: 2, name: 'Course 2', credit: 20 },
      3: { id: 3, name: 'Course 3', credit: 40 },
    },
  });

  it('should return the courses from state', () => {
    const courses = getCourses(state);
    expect(courses).toEqual(state.get('courses'));
  });

  it('should return a list of courses using getListCourses selector', () => {
    const expectedList = state.get('courses').valueSeq().toList();
    const courseList = getListCourses(state);
    expect(courseList).toEqual(expectedList);
  });
});
