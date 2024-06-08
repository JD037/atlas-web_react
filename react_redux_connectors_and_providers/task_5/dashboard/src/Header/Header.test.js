import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header'; // Import the unconnected Header
import Adapter from 'enzyme-adapter-react-16';
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
    const wrapper = shallow(<Header user={{ isLoggedIn: false }} logout={jest.fn()} />);
    expect(wrapper).not.toBeNull();
  });

  it('renders a welcome message when the user is logged in', () => {
    const user = { email: 'test@test.com', isLoggedIn: true };
    const wrapper = shallow(<Header user={user} logout={jest.fn()} />);
    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection').text()).toContain('Welcome test@test.com');
  });

  it('does not render a welcome message when the user is not logged in', () => {
    const wrapper = shallow(<Header user={{ isLoggedIn: false }} logout={jest.fn()} />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('calls the logout function when the logout link is clicked', () => {
    const logout = jest.fn();
    const user = { email: 'test@test.com', isLoggedIn: true };
    const wrapper = shallow(<Header user={user} logout={logout} />);
    wrapper.find('#logoutSection a').simulate('click', { preventDefault: () => {} });
    expect(logout).toHaveBeenCalled();
  });
});
