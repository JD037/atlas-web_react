import uiReducer from './uiReducer';
import { Map } from 'immutable';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGIN
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: Map({}),
  });

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    const action = { type: 'SELECT_COURSE' };
    expect(uiReducer(undefined, action)).toEqual(initialState);
  });

  it('should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    const action = { type: DISPLAY_NOTIFICATION_DRAWER };
    const expectedState = initialState.set('isNotificationDrawerVisible', true);
    expect(uiReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN action', () => {
    const action = { type: LOGIN, user: { email: 'test@test.com' } };
    const expectedState = initialState.set('user', Map(action.user));
    expect(uiReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const action = { type: LOGIN_SUCCESS };
    const expectedState = initialState.set('isUserLoggedIn', true);
    expect(uiReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_FAILURE action', () => {
    const action = { type: LOGIN_FAILURE };
    const expectedState = initialState.set('isUserLoggedIn', false);
    expect(uiReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT action', () => {
    const action = { type: LOGOUT };
    const expectedState = initialState.set('isUserLoggedIn', false).set('user', Map({}));
    expect(uiReducer(undefined, action)).toEqual(expectedState);
  });
});
