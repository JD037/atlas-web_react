import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    shallow(<NotificationItem type="default" />);
  });

  it('renders the correct HTML with type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.html()).toContain('<li data-notification-type="default">test</li>');
  });

  it('renders the correct HTML with html prop', () => {
	const wrapper = shallow(<NotificationItem type="default" html={{ __html: '<u>test</u>' }} />);
	expect(wrapper.html()).toContain('<li data-notification-type="default"><u>test</u></li>');
  });

  it('renders nothing if no value or html prop is provided', () => {
    const wrapper = shallow(<NotificationItem type="default" />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});