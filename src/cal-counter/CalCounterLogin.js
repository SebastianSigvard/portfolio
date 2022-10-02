import React from 'react';

export default class CalCountLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleLogin(event) {
    event.preventDefault();
    await this.props.handleLogin(this.state.userName, this.state.password);
  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="container">
        <h2>LOGIN</h2>
        <form id="login-form" className="main-panel">
          <label><strong>Username</strong></label>
          <br/><input id="user-name" type="text" placeholder="Enter Username" name="userName"
            value={this.state.userName} onChange={this.handleChange} required/>

          <br/><label><strong>Password</strong></label>
          <br/><input id="password" type="password" placeholder="Enter Password" name="password"
            value={this.state.password} onChange={this.handleChange} required/>

          <br/>
          <button id="submit-button" onClick={this.handleLogin}>Login</button>
          <button id="go-registration-button" onClick={this.props.handleGoToRegister} >Register</button>
        </form>
      </div>
    );
  }
}
