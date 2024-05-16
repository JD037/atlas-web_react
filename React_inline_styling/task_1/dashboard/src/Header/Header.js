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
  },
  appLogo: {
    height: '200px',
  },
});

function Header() {
  return (
    <header className={css(styles.appHeader)}>
      <img src={holbertonLogo} alt="Holberton Logo" className={css(styles.appLogo)} />
      <h1>School dashboard</h1>
    </header>
  );
}

export default Header;
