import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App, { mapStateToProps } from './App';
import { fromJS } from 'immutable';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
let store;
const defaultUser = { email: '', password: '', isLoggedIn: false };

describe('App component', () => {
  beforeEach(() => {
    store = mockStore({
      isUserLoggedIn: false,
    });
  });

  const mountComponent = () => {
    return mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  it('default state for displayDrawer is false', () => {
    const wrapper = mountComponent();
    expect(wrapper.find(App).children().instance().state.displayDrawer).toBe(false);
  });

  it('handleDisplayDrawer sets displayDrawer to true', () => {
    const wrapper = mountComponent();
    act(() => {
      wrapper.find(App).children().instance().handleDisplayDrawer();
    });
    wrapper.update();
    expect(wrapper.find(App).children().instance().state.displayDrawer).toBe(true);
  });

  it('handleHideDrawer sets displayDrawer to false', () => {
    const wrapper = mountComponent();
    const appInstance = wrapper.find(App).children().instance();
    act(() => {
      appInstance.handleDisplayDrawer();
      appInstance.handleHideDrawer();
    });
    wrapper.update();
    expect(wrapper.find(App).children().instance().state.displayDrawer).toBe(false);
  });

  it('updates state correctly when logIn is called', () => {
    const wrapper = mountComponent();
    const appInstance = wrapper.find(App).children().instance();
    act(() => {
      appInstance.logIn('test@test.com', 'password');
    });
    wrapper.update();
    expect(appInstance.state.user).toEqual({
      email: 'test@test.com',
      password: 'password',
      isLoggedIn: true,
    });
  });

  it('updates state correctly when logOut is called', () => {
    const wrapper = mountComponent();
    const appInstance = wrapper.find(App).children().instance();
    act(() => {
      appInstance.logIn('test@test.com', 'password');
      appInstance.logOut();
    });
    wrapper.update();
    expect(appInstance.state.user).toEqual(defaultUser);
  });

  it('markNotificationAsRead works as intended', () => {
    const wrapper = mountComponent();
    const appInstance = wrapper.find(App).children().instance();
    const initialNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];
    act(() => {
      appInstance.setState({ listNotifications: initialNotifications });
    });
    wrapper.update();
    act(() => {
      appInstance.markNotificationAsRead(2);
    });
    wrapper.update();
    expect(appInstance.state.listNotifications).toEqual([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ]);
  });
});

describe('mapStateToProps', () => {
  it('should return the correct object when the state is provided as a plain object', () => {
    const state = {
      isUserLoggedIn: true,
    };

    const expectedProps = {
      isLoggedIn: true,
    };

    expect(mapStateToProps(state)).toEqual(expectedProps);
  });

  it('should return the correct object when the state is provided as an Immutable Map', () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });

    const expectedProps = {
      isLoggedIn: true,
    };

    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
