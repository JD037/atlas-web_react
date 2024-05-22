import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

describe('NotificationItem component tests', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<NotificationItem />);
  });

  it('renders the correct html for default type', () => {
    const wrapper = shallow(<NotificationItem type="default" value="Test" />);
    expect(wrapper.find('li').prop('data-notification-type')).toBe('default');
  });

  it('renders the correct html for urgent type', () => {
    const wrapper = shallow(<NotificationItem type="urgent" value="Test" />);
    expect(wrapper.find('li').prop('data-notification-type')).toBe('urgent');
  });
});
