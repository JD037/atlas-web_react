// src/selectors/notificationSelector.js

import { createSelector } from 'reselect';
import { Map } from 'immutable';

// Selector to get the filter from the state
export const filterTypeSelected = (state) => state.notifications.get('filter');

// Selector to get the notifications from the state
export const getNotifications = (state) => state.notifications.get('notifications');

// Memoized selector to get unread notifications by type
export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    const unreadNotifications = notifications.filter(notification => !notification.getIn(['context', 'isRead']));
    if (filter === 'urgent') {
      return unreadNotifications.filter(notification => notification.getIn(['context', 'type']) === 'urgent').valueSeq();
    }
    return unreadNotifications.valueSeq();
  }
);
