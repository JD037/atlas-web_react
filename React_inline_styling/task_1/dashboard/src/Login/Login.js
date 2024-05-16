import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  loginForm: {
    display: 'flex',
    justifyContent: 'space-between', // Ensures space between elements
    alignItems: 'center',
    width: '100%',
    marginBottom: '40px', // Add margin at the bottom of the form
  },
  label: {
    marginRight: '10px', // Ensures space between label and input
  },
  input: {
    flexGrow: 1,
    marginRight: '10px', // Space between input and button
  },
});

function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className={css(styles.loginForm)}>
        <label htmlFor="email" className={css(styles.label)}>Email:</label>
        <input type="email" id="email" name="email" className={css(styles.input)} />
        <label htmlFor="password" className={css(styles.label)}>Password:</label>
        <input type="password" id="password" name="password" className={css(styles.input)} />
        <button>OK</button>
      </form>
    </React.Fragment>
  );
}

export default Login;
