// src/selectors/notificationSelector.js

import { createSelector } from 'reselect';

// Selector to get the filter from the state
export const filterTypeSelected = (state) => state.get('filter');

// Selector to get the notifications from the state
export const getNotifications = (state) => state.get('notifications');

// Selector to get the unread notifications from the state
export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) => notifications.filter(notification => !notification.get('isRead'))
);
