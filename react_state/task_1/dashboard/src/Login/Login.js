import React, { Component } from 'react';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value }, this.updateSubmitState);
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }, this.updateSubmitState);
  }

  updateSubmitState() {
    const { email, password } = this.state;
    this.setState({ enableSubmit: email !== '' && password !== '' });
  }

  render() {
    const { email, password, enableSubmit, isLoggedIn } = this.state;

    return (
      <React.Fragment>
        <p>Login to access the full dashboard</p>
        {isLoggedIn && <p>You are now logged in!</p>}
        <form className={css(styles.loginForm)} onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email" className={css(styles.label)}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
            className={css(styles.input)}
          />
          <label htmlFor="password" className={css(styles.label)}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
            className={css(styles.input)}
          />
          <input
            type="submit"
            value="OK"
            className={css(styles.button)}
            disabled={!enableSubmit}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
