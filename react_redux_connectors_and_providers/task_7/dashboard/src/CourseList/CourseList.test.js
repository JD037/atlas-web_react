import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from 'aphrodite';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { fromJS } from 'immutable';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('CourseList component tests', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders CourseList component without crashing', () => {
    const store = mockStore({
      courses: fromJS([]),
    });
    shallow(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
  });

  it('dispatches fetchCourses when mounted', () => {
    const store = mockStore({
      courses: fromJS([]),
    });

    store.dispatch = jest.fn();

    mount(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchCourses());
  });

  it('dispatches selectCourse and unSelectCourse when onChangeRow is called', () => {
    const store = mockStore({
      courses: fromJS([
        { id: 1, name: 'Course 1', credit: 60 },
        { id: 2, name: 'Course 2', credit: 20 },
        { id: 3, name: 'Course 3', credit: 40 },
      ]),
    });

    const wrapper = mount(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    const onChangeRow = wrapper.find('CourseListRow').first().prop('onChangeRow');
    onChangeRow(true);
    expect(store.getActions()).toEqual([selectCourse(1)]);

    onChangeRow(false);
    expect(store.getActions()).toEqual([selectCourse(1), unSelectCourse(1)]);
  });
});
