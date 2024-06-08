import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList'; // Ensure CourseList is imported
import PropTypes from 'prop-types';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { StyleSheet, css } from 'aphrodite';
import { AppContext, defaultUser, defaultLogOut } from './AppContext';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      user: defaultUser,
      logOut: this.logOut,
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  }

  logIn(email, password) {
    this.props.loginRequest(email, password);
  }

  logOut() {
    this.props.logout();
  }

  markNotificationAsRead(id) {
    this.setState((prevState) => ({
      listNotifications: prevState.listNotifications.filter(notification => notification.id !== id),
    }));
  }

  render() {
    const { listNotifications } = this.state;
    const { isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer } = this.props;

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <AppContext.Provider value={{ user: { email: this.props.userEmail, isLoggedIn }, logOut: this.logOut }}>
        <React.Fragment>
          <Notifications
            displayDrawer={displayDrawer}
            handleDisplayDrawer={displayNotificationDrawer}
            handleHideDrawer={hideNotificationDrawer}
            listNotifications={listNotifications}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <div className={css(styles.app)}>
            <Header />
            <div className={css(styles.body, isLoggedIn ? styles.loggedIn : styles.loggedOut)}>
              {isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <Login logIn={this.logIn} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title="News from the School">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </BodySection>
            </div>
            <Footer />
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  userEmail: PropTypes.string,
  logOut: PropTypes.func,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

App.defaultProps = {
  isLoggedIn: false,
  userEmail: '',
  logOut: () => {},
  displayDrawer: false,
};

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn'),
  userEmail: state.ui.getIn(['user', 'email']),
  displayDrawer: state.ui.get('isNotificationDrawerVisible'),
});


const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
    marginTop: '50px',
  },
  body: {
    fontSize: '18px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '0 auto',
    maxWidth: '600px',
    minHeight: 'calc(100vh - 400px)',
  },
  footer: {},
  loggedIn: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
  },
  loggedOut: {},
  '@media (prefers-reduced-motion: no-preference)': {
    appLogo: {
      animation: 'App-logo-spin infinite 20s linear',
    },
  },
  '@keyframes App-logo-spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
});
