import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { AppContext, defaultUser } from '../App/AppContext';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

Enzyme.configure({ adapter: new Adapter() });

describe('Header component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const contextValues = { user: defaultUser, logOut: jest.fn() };
    const wrapper = shallow(
      <AppContext.Provider value={contextValues}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper).not.toBeNull();
  });

  it('renders a welcome message when the user is logged in', () => {
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };
    const logOut = jest.fn();

    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain('Welcome test@test.com');
  });

  it('does not render a welcome message when the user is not logged in', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('calls the logOut function when the logout link is clicked', () => {
    const logOut = jest.fn();
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };

    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>
    );

    wrapper.find('#logoutSection a').simulate('click');
    expect(logOut).toHaveBeenCalled();
  });
});
