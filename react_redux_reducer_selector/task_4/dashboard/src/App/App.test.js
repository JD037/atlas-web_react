import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react';
import App from './App';
import { AppContext, defaultUser } from './AppContext';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    // Ensure Aphrodite has a style tag to work with
    document.head.innerHTML = '<style data-aphrodite></style>';
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('default state for displayDrawer is false', () => {
    act(() => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('handleDisplayDrawer sets displayDrawer to true', () => {
    act(() => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    act(() => {
      wrapper.instance().handleDisplayDrawer();
    });
    wrapper.update();
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('handleHideDrawer sets displayDrawer to false', () => {
    act(() => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    act(() => {
      wrapper.instance().handleDisplayDrawer(); // First set it to true
      wrapper.instance().handleHideDrawer(); // Then hide it
    });
    wrapper.update();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('updates state correctly when logIn is called', () => {
    act(() => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    const appInstance = wrapper.instance();

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
    act(() => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    const appInstance = wrapper.instance();

    act(() => {
      appInstance.logIn('test@test.com', 'password');
    });
    wrapper.update();
    act(() => {
      appInstance.logOut();
    });
    wrapper.update();
    expect(appInstance.state.user).toEqual(defaultUser);
  });

  it('markNotificationAsRead works as intended', () => {
    act(() => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    const appInstance = wrapper.instance();

    const initialNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];

    appInstance.setState({ listNotifications: initialNotifications });
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
