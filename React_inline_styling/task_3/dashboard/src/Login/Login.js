import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '40px',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    marginBottom: '10px',
  },
  button: {
    marginTop: '10px',
  },
  '@media (min-width: 900px)': {
    loginForm: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      marginBottom: '0',
      marginRight: '10px',
    },
    input: {
      marginBottom: '0',
      marginRight: '10px',
      flexGrow: 1,
    },
    button: {
      marginTop: '0',
    },
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
        <button className={css(styles.button)}>OK</button>
      </form>
    </React.Fragment>
  );
}

export default Login;
