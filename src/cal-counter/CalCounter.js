import { eventWrapper } from '@testing-library/user-event/dist/utils';
import React from 'react'
import './calCounter.css'

class CalCountApp extends React.Component {

  render(){
    const num_input_properties = {
      className:"nutrition-input",
      type: "number",
      min:"0",
      max:"200",
      placeholder:"0g"
    }

    return (
      <div className="container">
        <h2 id="cal-title">Calories Counter</h2>
        <div className="container" id="main">
            <h2>Add food</h2>
            <form id="create-form">
              <div className="nutrition-values">
                <label htmlFor="create-name">Food name:</label>  <input id="create-name" type="text/" placeholder="Name"/>
                <label htmlFor="create-carbs">Carbs:</label>     <input id="create-carbs" {... num_input_properties} />
                <label htmlFor="create-protein">Protein:</label> <input id="create-protein" {... num_input_properties} />
                <label htmlFor="create-fat">Fat:</label>         <input id="create-fat" {... num_input_properties} />
              </div>
              <button className="btn btn-default create-submit">Add</button>
            </form>

            <h2>Stats</h2>
            <canvas id="app-chart" width="100%"></canvas>

            <h2>Log</h2>
            <div className="card" id="total-calories-container">
              <h3>Total calories logged: <span id="total-calories">0</span></h3>
            </div>
            <ul id="food-list"></ul>
        </div>
        <button id="clean-entrys">Clean Entrys</button><button id="log-out" onClick={this.props.handleLogout}>LogOut</button>
      </div>
    );
  }
}

class CalCountLogin extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userName: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleLogin(event){
    event.preventDefault();
    await this.props.handleLogin(this.state.userName, this.state.password);
  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value}) 
  }

  render(){
    return(
      <div className="container">
        <h2>LOGIN</h2>
        <form id="login-form" className="main-panel">
            <label><strong>Username</strong></label> 
            <br/><input id="user-name" type="text" placeholder="Enter Username" name="userName" value={this.state.userName} onChange={this.handleChange} required/>
            <br/><label><strong>Password</strong></label>
            <br/><input id="password" type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange}  required/>
            <br/>
            <button id="submit-button" onClick={this.handleLogin}>Login</button>
            <button id="go-registration-button" onClick={this.props.handleGoToRegister} >Register</button>
        </form>
      </div>
    );
  }
}

class CalCountRegister extends React.Component {

  render(){
    return(
      <div className="container">
        <h2>REGISTRATION</h2>
        <form id="registration-form" className="main-panel">
            <label><strong>Username</strong></label> 
            <br/><input id="user-name-reg" type="text" placeholder="Enter Username" required/>
            <br/><label><strong>Password</strong></label>
            <br/><input id="password-reg" type="password" placeholder="Enter Password" required/>
            <br/>
            <button id="submit-button-reg">Register</button>
            <button id="go-login-button" onClick={this.props.handleGoToLogin}>GoLogin</button>
        </form>
      </div>
    );
  }
}

export default class CalCounter extends React.Component {
  constructor(){
    super();        

    this.state = {
        token : localStorage.getItem('token'),
        onLogin: true
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleGoToRegister = this.handleGoToRegister.bind(this);
    this.handleGoToLogin = this.handleGoToLogin.bind(this);
  }

  async componentDidMount(){
    if(!this.state.token) return;

    const resp = await fetch('/token-validation', {
      method: 'get',
      headers: {'Authorization': this.state.token},
    });
    
    if(resp.status === 200) return;
    localStorage.removeItem('token')
    this.setState({token: ''});
  }

  async handleLogin(userName, password){
    const resp = await fetch('/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       userName,
       password
      })
    });

    const data = await resp.json();

    if(data.status === 'ok') {
      localStorage.setItem('token', data.token);
      this.setState({token: data.token});
    } else {
      alert(data.error);
    }
  }

  handleLogout(){
    localStorage.removeItem('token');
    this.setState({token: ''});
  }

  handleGoToRegister(){
    this.setState({onLogin: false});
  }

  handleGoToLogin(){
    this.setState({onLogin: true});
  }

  render(){
    return ( 
      <section className="hero-calcount">
        {this.state.token && <CalCountApp handleLogout={this.handleLogout}/>}
        {!this.state.token && this.state.onLogin && <CalCountLogin handleLogin={this.handleLogin} handleGoToRegister={this.handleGoToRegister}/>}
        {!this.state.token && !this.state.onLogin && <CalCountRegister handleGoToLogin={this.handleGoToLogin}/>}
      </section>
    );
  }
}