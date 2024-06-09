import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { FETCH_COURSES_SUCCESS } from './courseActionTypes';
import { fetchCourses } from './courseActionCreators';
import { setCourses } from './courseActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Course Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_COURSES_SUCCESS when fetching courses has been done', () => {
    fetchMock.getOnce('/path/to/courses.json', {
      body: [
        { id: 1, name: 'Course 1', credit: 60 },
        { id: 2, name: 'Course 2', credit: 20 },
        { id: 3, name: 'Course 3', credit: 40 },
      ],
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: FETCH_COURSES_SUCCESS,
        data: {
          entities: {
            courses: {
              '1': { id: 1, name: 'Course 1', credit: 60 },
              '2': { id: 2, name: 'Course 2', credit: 20 },
              '3': { id: 3, name: 'Course 3', credit: 40 },
            },
          },
          result: [1, 2, 3],
        },
      },
    ];

    const store = mockStore({ courses: {} });

    return store.dispatch(fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
