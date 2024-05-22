import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { AppContext } from '../App/AppContext';

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

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <header className={css(styles.appHeader)}>
        <img src={holbertonLogo} alt="Holberton Logo" className={css(styles.appLogo)} />
        <h1 className={css(styles.headerText)}>School dashboard</h1>
        {user.isLoggedIn && (
          <div className={css(styles.logoutSection)} id="logoutSection">
            Welcome {user.email} (<a href="#" onClick={logOut}>logout</a>)
          </div>
        )}
      </header>
    );
  }
}

export default Header;
