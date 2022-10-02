import React from 'react'
import { CardCalc, CardTips } from './MarketStatusCards';

export default class MarketStatusAPI extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currencyPairTips: '',
      currencyPairCalc: '',
      operation: '',
      amount: 0,
      cap: '',
      tipsApiResults: null,
      calcApiResults: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleGetTips = this.handleGetTips.bind(this);
    this.handleGetCalc = this.handleGetCalc.bind(this);
  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value}) 
  }

  async handleGetTips(event){
    event.preventDefault();
    const resp = await fetch(process.env.REACT_APP_MARKET_STATUS_BASE_URL + '/tips/' + this.state.currencyPairTips);
    const data = await resp.json();
    this.setState({tipsApiResults: <CardTips {...data}/>})
  }

  async handleGetCalc(event){
    event.preventDefault();

    const resp = await fetch( process.env.REACT_APP_MARKET_STATUS_BASE_URL + "/calculate-price", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        currencyPair: this.state.currencyPairCalc, 
        operation: this.state.operation, 
        amount: this.state.amount, 
        cap: this.state.cap})
    })
    const data = await resp.json();
    this.setState({calcApiResults:  <CardCalc currencyPairTips={this.state.currencyPairCalc} operation={this.state.operation} {...data}/>})
  }

  render(){
    return(
      <div>
        <h2>API REST</h2>
        <h3>Tips</h3>
        <form>
          <label><strong>Currency Pair</strong></label> 
          <br/> <input type="text" placeholder="BTC-USD" name="currencyPairTips" value={this.state.currencyPairTips} onChange={this.handleChange} required/>
          <br/> <button onClick={this.handleGetTips}>Get</button>
          <br/> <div>{this.state.tipsApiResults}</div>
        </form>
        <h3>Calculate Price</h3>
        <form>
          <label><strong>Currency Pair</strong></label> 
          <br/> <input type="text" placeholder="BTC-USD" name="currencyPairCalc" value={this.state.currencyPairCalc} onChange={this.handleChange} required/>
          <br/> <label><strong>Operation</strong></label> 
          <br/> <input type="text" placeholder="buy/sell" name="operation" value={this.state.operation} onChange={this.handleChange} required/>
          <br/> <label><strong>Amount</strong></label> 
          <br/> <input type="number" placeholder={0} name="amount" value={this.state.amount} onChange={this.handleChange} required/>
          <br/> <label><strong>Cap (optional)</strong></label> 
          <br/> <input type="number" placeholder={0} name="cap" value={this.state.cap} onChange={this.handleChange} required/>
          <br/> <button onClick={this.handleGetCalc}>Post</button>
          <br/> <div>{this.state.calcApiResults}</div>
        </form>
      </div>
    );
  }
}