import { fromJS } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
  getUnreadNotificationsByType
} from './notificationSelector';

describe('notification selectors', () => {
  const state = fromJS({
    notifications: {
      filter: 'default',
      notifications: {
        '1': { id: 1, context: { isRead: false, type: "default", value: "New course available" } },
        '2': { id: 2, context: { isRead: true, type: "urgent", value: "New resume available" } },
        '3': { id: 3, context: { isRead: false, type: "urgent", value: "New data available" } }
      }
    }
  });

  it('filterTypeSelected should return the filter value', () => {
    expect(filterTypeSelected(state)).toEqual('default');
  });

  it('getNotifications should return the list of notifications', () => {
    const notifications = getNotifications(state);
    expect(notifications).toEqual(state.getIn(['notifications', 'notifications']));
  });

  it('getUnreadNotifications should return the list of unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(state);
    const expectedUnread = fromJS({
      '1': { id: 1, context: { isRead: false, type: "default", value: "New course available" } },
      '3': { id: 3, context: { isRead: false, type: "urgent", value: "New data available" } }
    });
    expect(unreadNotifications).toEqual(expectedUnread);
  });

  it('getUnreadNotificationsByType should return unread notifications of type default when filter is default', () => {
    const result = getUnreadNotificationsByType(state);
    const expected = fromJS({
      '1': { id: 1, context: { isRead: false, type: 'default', value: 'New course available' } },
      '3': { id: 3, context: { isRead: false, type: 'urgent', value: 'New data available' } }
    });
    expect(result.size).toBe(2);
  });

  it('getUnreadNotificationsByType should return unread notifications of type urgent when filter is urgent', () => {
    const stateWithUrgentFilter = state.setIn(['notifications', 'filter'], 'urgent');
    const result = getUnreadNotificationsByType(stateWithUrgentFilter);
    const expected = fromJS({
      '3': { id: 3, context: { isRead: false, type: 'urgent', value: 'New data available' } }
    });
    expect(result.size).toBe(1);
    expect(result.first().get('id')).toBe(3);
  });
});
