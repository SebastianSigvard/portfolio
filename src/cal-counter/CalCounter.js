import CalCountRegister from './CalCounterRegister.js';
import CalCountLogin from './CalCounterLogin.js';
import CalCountApp from './CalCounterApp.js';
import React from 'react';
import './calCounter.css';

export default class CalCounter extends React.Component {
  constructor() {
    super();

    this.state = {
      token: localStorage.getItem('token'),
      onLogin: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleGoToRegister = this.handleGoToRegister.bind(this);
    this.handleGoToLogin = this.handleGoToLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  async componentDidMount() {
    if (!this.state.token) return;

    const resp = await fetch('/token-validation', {
      method: 'get',
      headers: {'Authorization': this.state.token},
    });

    if (resp.status === 200) return;
    localStorage.removeItem('token');
    this.setState({token: ''});
  }

  async handleLogin(userName, password) {
    const resp = await fetch('/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await resp.json();

    if (data.status === 'ok') {
      localStorage.setItem('token', data.token);
      this.setState({token: data.token});
    } else {
      alert(data.error);
    }
  }

  async handleRegistration(userName, password) {
    const resp = await fetch('/registration', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await resp.json();

    if (data.status !== 'ok') {
      alert(data.error);
      return;
    }
    this.setState({onLogin: true});
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({token: ''});
  }

  handleGoToRegister() {
    this.setState({onLogin: false});
  }

  handleGoToLogin() {
    this.setState({onLogin: true});
  }

  render() {
    return (
      <section className="hero-calcount">
        {this.state.token && <CalCountApp handleLogout={this.handleLogout}/>}
        {!this.state.token && this.state.onLogin && <CalCountLogin
          handleLogin={this.handleLogin} handleGoToRegister={this.handleGoToRegister}/>}

        {!this.state.token && !this.state.onLogin && <CalCountRegister
          handleRegistration={this.handleRegistration} handleGoToLogin={this.handleGoToLogin}/>}
      </section>
    );
  }
}
