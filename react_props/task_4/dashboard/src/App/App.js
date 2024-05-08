import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';

function App({ isLoggedIn }) {
  return (
    <div className="App">
      <Notifications displayDrawer={isLoggedIn} />
      <Header />
      <div className={`App-body ${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
        {isLoggedIn ? <CourseList /> : <Login />}
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: false,
};

export default App;