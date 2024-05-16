import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { StyleSheetTestUtils } from 'aphrodite';

Enzyme.configure({ adapter: new Adapter() });

import NotificationItem from './NotificationItem';

describe('Notifications', () => {
  let wrapper;
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct list items', () => {
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it('renders the text "Here is the list of notifications"', () => {
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toEqual(true);
  });

  it('does not rerender when updating the props with the same list', () => {
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications });
    expect(shouldUpdate).toBe(false);
  });

  it('rerender when updating the props with a longer list', () => {
    const newListNotifications = [
      ...listNotifications,
      { id: 4, type: 'default', value: 'New notification' },
    ];
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: newListNotifications });
    expect(shouldUpdate).toBe(true);
  });
});
