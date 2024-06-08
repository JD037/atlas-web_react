import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/uiActions';

const styles = StyleSheet.create({
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: '#e0354b',
    borderBottom: '3px solid #e0354b',
    paddingBottom: '10px',
    '@media (max-width: 900px)': {
      display: 'block',
      textAlign: 'center',
    },
  },
  appLogo: {
    height: '200px',
    '@media (max-width: 900px)': {
      height: '150px',
      margin: '0 auto',
    },
  },
  headerText: {
    '@media (max-width: 900px)': {
      margin: '0',
    },
  },
  logoutSection: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
});

const Header = ({ user, logout }) => (
  <header className={css(styles.appHeader)}>
    <img src={holbertonLogo} alt="Holberton Logo" className={css(styles.appLogo)} />
    <h1 className={css(styles.headerText)}>School dashboard</h1>
    {user.isLoggedIn && (
      <div className={css(styles.logoutSection)} id="logoutSection">
        Welcome {user.email} (<a href="#" onClick={logout}>logout</a>)
      </div>
    )}
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.ui.get('user'),
});

const mapDispatchToProps = {
  logout,
};

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
