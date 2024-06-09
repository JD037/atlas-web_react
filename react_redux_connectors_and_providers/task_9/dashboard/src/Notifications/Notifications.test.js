import React from 'react';
import { shallow } from 'enzyme';
import Notifications, { css, styles } from './Notifications';
import NotificationItem from './NotificationItem';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('<Notifications />', () => {
  it('clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} isLoggedIn={true} />
    );
    wrapper.find(`.${css(styles.menuItem)}`).simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('clicking on the close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );
    wrapper.find(`.${css(styles.closeBtn)}`).simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  it('calls markNotificationAsRead with the correct id', () => {
    const handleHideDrawer = jest.fn();
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        handleHideDrawer={handleHideDrawer}
      />
    );
    wrapper.instance().markAsRead = jest.fn();
    wrapper.update();
    wrapper.find(NotificationItem).first().props().markAsRead();
    expect(wrapper.instance().markAsRead).toHaveBeenCalledWith(1);
  });

  it('clicking on the first button should call setNotificationFilter with URGENT', () => {
    const setNotificationFilter = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} setNotificationFilter={setNotificationFilter} />
    );
    wrapper.find('button').at(0).simulate('click');
    expect(setNotificationFilter).toHaveBeenCalledWith('urgent');
  });

  it('clicking on the second button should call setNotificationFilter with DEFAULT', () => {
    const setNotificationFilter = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} setNotificationFilter={setNotificationFilter} />
    );
    wrapper.find('button').at(1).simulate('click');
    expect(setNotificationFilter).toHaveBeenCalledWith('default');
  });
});
