import React from 'react'
import './calCounter.css'

export default class CalCounter extends React.Component {
    render(){
        return ( 
            <section className="hero-calcount">
            <div className="container">
                <h2 id="cal-title">Calories Counter</h2>
    
                <div className="container" id="main">
                    <h2>Add food</h2>
                    <form id="create-form">
                      <div className="nutrition-values">
                        <label for="create-name">Food name:</label>
                        <input id="create-name" type="text/" placeholder="Name"/>
                        <label for="create-carbs">Carbs:</label>
                        <input
                          className="nutrition-input"
                          type="number"
                          id="create-carbs"
                          min="0"
                          max="200"
                          placeholder="0g"
                        />
                        <label for="create-protein">Protein:</label>
                        <input
                          className="nutrition-input"
                          type="number"
                          id="create-protein"
                          min="0"
                          max="200"
                          placeholder="0g"
                        />
                        <label for="create-fat">Fat:</label>
                        <input
                          className="nutrition-input"
                          type="number"
                          id="create-fat"
                          min="0"
                          max="200"
                          placeholder="0g"
                        />
                        <div></div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-default create-submit"
                        value="Add"
                      />
                    </form>
                    <h2>Stats</h2>
                    <canvas id="app-chart" width="100%"></canvas>
                    <h2>Log</h2>
                    <div className="card" id="total-calories-container">
                      <h3>Total calories logged: <span id="total-calories">0</span></h3>
                    </div>
                    <ul id="food-list"></ul>
                </div>
    
                <button id="clean-entrys">Clean Entrys</button><button id="log-out">LogOut</button>
            </div>
        </section>
        );
    }
}