// src/actions/uiActions.js

import { 
  DISPLAY_NOTIFICATION_DRAWER, 
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './uiActionTypes';

// Action creators for notification drawer
export const displayNotificationDrawer = () => ({
  type: DISPLAY_NOTIFICATION_DRAWER,
});

export const hideNotificationDrawer = () => ({
  type: HIDE_NOTIFICATION_DRAWER,
});

// Action creators for login and logout
export const login = (email, password) => ({
  type: LOGIN,
  user: { email, password }
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
});

// Thunk action creator for async login
export const loginRequest = (email, password) => {
  return async (dispatch) => {
    dispatch(login(email, password));
    console.log('Login action dispatched:', { email, password });

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const users = await response.json();
      console.log('API response:', users);

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        dispatch(loginSuccess(user));
        console.log('Login successful:', user);
      } else {
        const error = 'Invalid email or password';
        dispatch(loginFailure(error));
        console.log('Login failed:', error);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log('Login error:', error.message);
    }
  };
};
