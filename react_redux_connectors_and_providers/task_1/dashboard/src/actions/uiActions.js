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
  
  export const loginSuccess = () => ({
	type: LOGIN_SUCCESS,
  });
  
  export const loginFailure = () => ({
	type: LOGIN_FAILURE,
  });
  