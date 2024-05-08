import React from 'react';
import './Login.css';

function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className="login-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button>OK</button>
      </form>
    </React.Fragment>
  );
}

export default Login;
