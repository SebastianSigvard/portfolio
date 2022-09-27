import React from 'react'

class Card extends React.Component {
  render(){
    const calories = this.props.carbs * 4 + this.props.protein * 4 + this.props.fat * 9;
    const capName = this.props.name[0].toUpperCase() + this.props.name.substring(1).toLowerCase();

    return(
      <li class="card" key={this.props.id}>
        <div>
          <h3 class="name">{capName}</h3>
          <div class="calories">{calories} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">{this.props.carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">{this.props.protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">{this.props.fat}g</div></li>
          </ul>
        </div>
      </li>
    );
  }
}

export default class CalCountApp extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        foodEntries: [],
        name: '',
        carbs: 0,
        protein: 0,
        fat: 0
      }

      this.handleAddFood = this.handleAddFood.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleCleanEntries = this.handleCleanEntries.bind(this);
    }

    async componentDidMount(){  
      const token = localStorage.getItem('token');
      if(!token) return this.props.handleLogout();

      const resp = await fetch('/cal-api-v1/food', {
        method: 'get',
        headers: {'Authorization': token},
      });
      
      if(resp.status !== 200) return this.props.handleLogout();

      const data = await resp.json();

      this.setState({foodEntries: data.foodEntries});
    }

    async handleChange(event) {
      const {name, value} = event.currentTarget;
      this.setState({[name]: value}) 
    }

    async handleAddFood(event){
      event.preventDefault();
      const token = localStorage.getItem('token');
      if(!token) return this.props.handleLogout();

      const resp = await fetch('/cal-api-v1/food', {
        method: 'post',
        headers: {'Authorization': token, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          carbs: this.state.carbs,
          protein: this.state.protein,
          fat: this.state.fat,
        })
      });
      
      if(resp.status !== 200) return this.props.handleLogout();

      const data = await resp.json();

      this.setState({foodEntries: [...this.state.foodEntries,{
        id: data.id,
        name: this.state.name,
        carbs: this.state.carbs,
        protein: this.state.protein,
        fat: this.state.fat,
      }]});
    }

    async handleCleanEntries(event){
      event.preventDefault();
      const token = localStorage.getItem('token');
      if(!token) return this.props.handleLogout();

      const resp = await fetch('/cal-api-v1/food', {
        method: 'delete',
        headers: {'Authorization': token},
      });
      
      if(resp.status !== 200) return this.props.handleLogout();

      this.setState({foodEntries: []});
    }

    render(){
      const num_input_properties = {
        className:"nutrition-input",
        type: "number",
        min:"0",
        max:"200",
        placeholder:"0g"
      }

      const cards = this.state.foodEntries.map(entrie => <Card {...entrie}/>);
      const calories = this.state.foodEntries.reduce((total, entrie) => {
        return total + entrie.carbs * 4 + entrie.protein * 4 + entrie.fat * 9;
      },0);

      return (
        <div className="container">
          <h2 id="cal-title">Calories Counter</h2>
          <div className="container" id="main">
              <h2>Add food</h2>
              <form id="create-form">
                <div className="nutrition-values">
                  <label htmlFor="create-name">Food name:</label>  
                  <input id="create-name" name="name" value={this.state.name} onChange={this.handleChange} type="text/" placeholder="Name"/>
                  <label htmlFor="create-carbs">Carbs:</label>     
                  <input id="create-carbs" name="carbs" value={this.state.carbs} onChange={this.handleChange} {... num_input_properties} />
                  <label htmlFor="create-protein">Protein:</label> 
                  <input id="create-protein" name="protein" value={this.state.protein} onChange={this.handleChange} {... num_input_properties} />
                  <label htmlFor="create-fat">Fat:</label>         
                  <input id="create-fat" name="fat" value={this.state.fat} onChange={this.handleChange} {... num_input_properties} />
                </div>
                <button className="btn btn-default create-submit" onClick={this.handleAddFood}>Add</button>
              </form>
  
              <h2>Stats</h2>
              <canvas id="app-chart" width="100%"></canvas>
  
              <h2>Log</h2>
              <div className="card" id="total-calories-container">
                <h3>Total calories logged: <span id="total-calories">{calories}</span></h3>
              </div>
              <ul id="food-list">{cards}</ul>
          </div>
          <button id="clean-entrys" onClick={this.handleCleanEntries}>Clean Entries</button><button id="log-out" onClick={this.props.handleLogout}>LogOut</button>
        </div>
      );
    }
  }
  