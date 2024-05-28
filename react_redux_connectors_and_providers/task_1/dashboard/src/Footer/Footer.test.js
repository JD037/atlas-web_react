import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { AppContext, defaultUser } from '../App/AppContext';

Enzyme.configure({ adapter: new Adapter() });

describe('Footer', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });

  it('renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain('Copyright');
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
