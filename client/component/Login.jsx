import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.scss';

// const loginLinkStyle = {
//   'font-size': '50px',
// }

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameInputField: '',
      passwordInputField: '',
      errorMessage: '',
    };
    this.handleUsernameInputField = this.handleUsernameInputField.bind(this);
    this.handlePasswordInputField = this.handlePasswordInputField.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleSignUpButton = this.handleSignUpButton.bind(this);
  }
  handleUsernameInputField(e) {
    this.setState({ usernameInputField: e.target.value });
  }
  handlePasswordInputField(e) {
    this.setState({ passwordInputField: e.target.value });
  }
  handleSignUpButton(e) {
    this.props.history.push('/register');
    e.preventDefault();
  }
  handlePasswordUsernameError(e) {}
  handleSubmitButton(e) {
    console.log('call to submit button');
    let url = 'http://localhost:8080/api/login';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.usernameInputField,
        password: this.state.passwordInputField,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('call to .then');
        if (data.err === 'user does not exist')
          return this.setState({ errorMessage: 'incorrect username or password' });
        this.props.addCurrentUser(data);
        this.props.history.push('/');
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          errorMessage: 'sorry, we could not process your username and password',
        });
      });
    this.setState({ usernameInputField: '', passwordInputField: '' });
    e.preventDefault();
  }
  render() {
    return (
      <div className='login'>
        <h1>Login</h1>
        <form id='loginForm' onSubmit={this.handleSubmitButton}>
          <input
            placeholder='username'
            name='usernameInputField'
            value={this.state.usernameInputField}
            onChange={this.handleUsernameInputField}
          ></input>
          <input
            placeholder="password"
            name="passwordInputField"
            type="password"
            value={this.state.passwordInputField}
            onChange={this.handlePasswordInputField}
          ></input>
          <button form='loginForm' type='submit' value='Submit'>
            Submit
          </button>
        </form>
        <span>Don't have an account?</span>
        <Link className='registerHere' to='/register'>
          Register Here
        </Link>
        <p className='error'>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default Login;
