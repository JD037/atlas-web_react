import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App, { mapStateToProps } from './App'; // Ensure mapStateToProps is correctly imported
import { AppContext, defaultUser } from './AppContext';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import { fromJS } from 'immutable';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
let store;

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      ui: {
        isLoggedIn: false,
      },
    });
    // Ensure Aphrodite has a style tag to work with
    document.head.innerHTML = '<style data-aphrodite></style>';
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  const mountComponent = () => {
    return mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  it('default state for displayDrawer is false', () => {
    act(() => {
      wrapper = mountComponent();
    });
    wrapper.update();
    expect(wrapper.find(App).children().instance().state.displayDrawer).toBe(false);
  });

  it('handleDisplayDrawer sets displayDrawer to true', () => {
    act(() => {
      wrapper = mountComponent();
    });
    wrapper.update();
    act(() => {
      wrapper.find(App).children().instance().handleDisplayDrawer();
    });
    wrapper.update();
    expect(wrapper.find(App).children().instance().state.displayDrawer).toBe(true);
  });

  it('handleHideDrawer sets displayDrawer to false', () => {
    act(() => {
      wrapper = mountComponent();
    });
    wrapper.update();
    act(() => {
      wrapper.find(App).children().instance().handleDisplayDrawer(); // First set it to true
      wrapper.find(App).children().instance().handleHideDrawer(); // Then hide it
    });
    wrapper.update();
    expect(wrapper.find(App).children().instance().state.displayDrawer).toBe(false);
  });

  it('updates state correctly when logIn is called', () => {
    act(() => {
      wrapper = mountComponent();
    });
    wrapper.update();
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
    act(() => {
      wrapper = mountComponent();
    });
    wrapper.update();
    const appInstance = wrapper.find(App).children().instance();

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
      wrapper = mountComponent();
    });
    wrapper.update();
    const appInstance = wrapper.find(App).children().instance();

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

describe('mapStateToProps', () => {
  it('should return the correct object when the state is provided', () => {
    const state = fromJS({
      ui: {
        isLoggedIn: true
      }
    });

    const expectedProps = {
      isLoggedIn: true
    };

    expect(mapStateToProps(state.toJS())).toEqual(expectedProps);
  });
});
