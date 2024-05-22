import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('<Notifications />', () => {
  it('clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} isLoggedIn={true} />
    );
    wrapper.find('.menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('clicking on the close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );
    wrapper.find('.closeBtn').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
