import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map } from 'immutable';
import uiReducer from '../reducers/uiReducer';

Enzyme.configure({ adapter: new Adapter() });

const initialState = Map({
  user: { email: 'test@test.com', isLoggedIn: true },
});

const store = createStore(uiReducer, initialState);

describe('Footer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the text "Copyright"', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    expect(wrapper.dive().text()).toContain('Copyright');
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    const store = createStore(uiReducer, Map({
      user: { isLoggedIn: false },
    }));
    const wrapper = shallow(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    expect(wrapper.dive().find('a').exists()).toBe(false);
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    const store = createStore(uiReducer, Map({
      user: { email: 'test@test.com', isLoggedIn: true },
    }));
    const wrapper = shallow(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    expect(wrapper.dive().find('a').exists()).toBe(true);
    expect(wrapper.dive().find('a').text()).toBe('Contact us');
  });
});
