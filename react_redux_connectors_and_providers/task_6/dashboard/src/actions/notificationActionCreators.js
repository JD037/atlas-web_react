import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS, SET_LOADING_STATE } from './notificationActionTypes';
import { bindActionCreators } from 'redux';
import { normalize, schema } from 'normalizr';

const userSchema = new schema.Entity('users');
const notificationSchema = new schema.Entity('notifications', {
  author: userSchema,
  context: {},
});
const notificationsSchema = [notificationSchema];

export const markAsRead = (index) => ({
  type: MARK_AS_READ,
  index,
});

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

export const setNotifications = (data) => {
  const normalizedData = normalize(data, notificationsSchema);
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data: normalizedData,
  };
};

export const fetchNotifications = () => {
  return async (dispatch) => {
    dispatch(setLoadingState(true));

    try {
      const response = await fetch('http://localhost:3001/notifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      dispatch(setNotifications(data));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };
};

export const boundMarkAsRead = (dispatch) => bindActionCreators(markAsRead, dispatch);
export const boundSetNotificationFilter = (dispatch) => bindActionCreators(setNotificationFilter, dispatch);
