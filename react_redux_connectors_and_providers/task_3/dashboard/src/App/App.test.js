import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import App, { mapStateToProps } from './App';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import uiReducer from '../reducers/uiReducer';
import { act } from 'react-dom/test-utils';

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });

// Mock initial state with Immutable.Map
const initialState = Map({
  isUserLoggedIn: false,
  isNotificationDrawerVisible: false,
});

const mountComponent = (state) => {
  const store = createStore(uiReducer, state);
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App component', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('default prop for displayDrawer is false', () => {
    wrapper = mountComponent(initialState);
    expect(wrapper.find('Notifications').prop('displayDrawer')).toEqual(false);
  });

  it('displayNotificationDrawer sets displayDrawer to true', () => {
    wrapper = mountComponent(initialState);
    act(() => {
      wrapper.find('Notifications').prop('handleDisplayDrawer')();
    });
    wrapper.update();
    expect(wrapper.find('Notifications').prop('displayDrawer')).toEqual(true);
  });

  it('updates state correctly when logIn is called', () => {
    wrapper = mountComponent(initialState);
    act(() => {
      wrapper.find('Login').prop('logIn')('test@test.com', 'password');
    });
    wrapper.update();
    const appInstance = wrapper.find(App).children().instance();
    expect(appInstance.state.user.isLoggedIn).toEqual(true);
  });

  it('updates state correctly when logOut is called', () => {
    wrapper = mountComponent(initialState.set('isUserLoggedIn', true));
    act(() => {
      wrapper.find(App).children().instance().logOut();
    });
    wrapper.update();
    const appInstance = wrapper.find(App).children().instance();
    expect(appInstance.state.user.isLoggedIn).toEqual(false);
  });

  it('markNotificationAsRead works as intended', () => {
    const notificationsState = initialState.set('listNotifications', [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ]);
    wrapper = mountComponent(notificationsState);
    act(() => {
      wrapper.find('Notifications').prop('markNotificationAsRead')(1);
    });
    wrapper.update();
    expect(wrapper.find('Notifications').prop('listNotifications').length).toEqual(2);
  });
});

describe('mapStateToProps', () => {
  it('should return the correct object when the state is provided', () => {
    const state = Map({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: true,
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: true,
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
