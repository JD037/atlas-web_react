// task_4/dashboard/src/HOC/WithLogging.test.js
import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs correct messages when wrapping a pure HTML element', () => {
    const PureHtmlComponent = WithLogging(() => <p />);
    const wrapper = mount(<PureHtmlComponent />);
    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  it('logs correct messages when wrapping the Login component', () => {
    const LoggedInComponent = WithLogging(Login);
    const wrapper = mount(<LoggedInComponent />);
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is going to unmount');
  });
});