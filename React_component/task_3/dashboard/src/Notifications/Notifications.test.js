import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });


import NotificationItem from './NotificationItem';

describe('<Notifications />', () => {
  it('renders without crashing', () => {
    shallow(<Notifications />);
  });

  it('renders NotificationItem components', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it('renders the correct HTML for the first NotificationItem', () => {
    const wrapper = shallow(<Notifications />);
    const firstNotificationItem = wrapper.find(NotificationItem).first();
    expect(firstNotificationItem.html()).toContain('<li data-notification-type="default">New course available</li>');
  });
  
  it('calls markAsRead with the right id when clicking on a NotificationItem', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    wrapper.find('NotificationItem').first().simulate('click');

    expect(spy).toHaveBeenCalledWith('Notification 1 has been marked as read');

    spy.mockRestore();
  });
});