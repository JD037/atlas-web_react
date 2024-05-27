// src/selectors/notificationSelector.test.js

import { fromJS } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications
} from './notificationSelector';

describe('notification selectors', () => {
  const state = fromJS({
    filter: 'DEFAULT',
    notifications: {
      '1': { id: 1, isRead: false, type: "default", value: "New course available" },
      '2': { id: 2, isRead: true, type: "urgent", value: "New resume available" },
      '3': { id: 3, isRead: false, type: "urgent", value: "New data available" }
    }
  });

  it('filterTypeSelected should return the filter value', () => {
    expect(filterTypeSelected(state)).toEqual('DEFAULT');
  });

  it('getNotifications should return the list of notifications', () => {
    const notifications = getNotifications(state);
    expect(notifications).toEqual(state.get('notifications'));
  });

  it('getUnreadNotifications should return the list of unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(state);
    const expectedUnread = fromJS({
      '1': { id: 1, isRead: false, type: "default", value: "New course available" },
      '3': { id: 3, isRead: false, type: "urgent", value: "New data available" }
    });
    expect(unreadNotifications).toEqual(expectedUnread);
  });
});
