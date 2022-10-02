import React from 'react';

export default class CalCountRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
    };

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleRegistration(event) {
    event.preventDefault();
    await this.props.handleRegistration(this.state.userName, this.state.password);
  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="container">
        <h2>REGISTRATION</h2>
        <form id="registration-form" className="main-panel">
          <label><strong>Username</strong></label>
          <br/><input id="user-name-reg" type="text" placeholder="Enter Username" name="userName"
            value={this.state.userName} onChange={this.handleChange} required/>

          <br/><label><strong>Password</strong></label>
          <br/><input id="password-reg" type="password" placeholder="Enter Password" name="password"
            value={this.state.password} onChange={this.handleChange} required/>

          <br/>
          <button id="submit-button-reg" onClick={this.handleRegistration}>Register</button>
          <button id="go-login-button" onClick={this.props.handleGoToLogin}>GoLogin</button>
        </form>
      </div>
    );
  }
}
