import React from 'react'

export default class CalCountApp extends React.Component {

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
  