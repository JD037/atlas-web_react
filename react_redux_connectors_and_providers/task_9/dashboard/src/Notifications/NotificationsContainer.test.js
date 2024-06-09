import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NotificationsContainer from './NotificationsContainer';
import { fetchNotifications } from '../actions/notificationActionCreators';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('NotificationsContainer', () => {
  let store;
  let fetchNotificationsMock;

  beforeEach(() => {
    fetchNotificationsMock = jest.fn();
    store = mockStore({
      ui: fromJS({
        isNotificationDrawerVisible: false,
      }),
      notifications: fromJS({
        filter: 'default',
        notifications: {},
      }),
    });
  });

  it('fetches notifications on mount', () => {
    shallow(
      <Provider store={store}>
        <NotificationsContainer fetchNotifications={fetchNotificationsMock} />
      </Provider>
    );
    expect(fetchNotificationsMock).toHaveBeenCalled();
  });
});
