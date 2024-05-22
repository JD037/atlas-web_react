import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';

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
});

function Header() {
  return (
    <header className={css(styles.appHeader)}>
      <img src={holbertonLogo} alt="Holberton Logo" className={css(styles.appLogo)} />
      <h1 className={css(styles.headerText)}>School dashboard</h1>
    </header>
  );
}

export default Header;
