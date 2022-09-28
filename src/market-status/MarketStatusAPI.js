import React from 'react'
// import dotenv from 'dotenv';
// dotenv.config();

class Card extends React.Component {
  render(){
    if(this.props.status === 'success'){
      return(
        <li class="card">
          <div>
            <h3 class="name">{this.props.currencyPair}</h3>
            <h4>Bid</h4>
            <ul class="macros">
              <li class="carbs"><div>Quantity</div><div class="value">{this.props.data.bid.quantity}</div></li>
              <li class="protein"><div>Rate</div><div class="value">{this.props.data.bid.rate}</div></li>
            </ul>
            <h4>Ask</h4>
            <ul class="macros">
              <li class="carbs"><div>Quantity</div><div class="value">{this.props.data.ask.quantity}</div></li>
              <li class="protein"><div>Rate</div><div class="value">{this.props.data.ask.rate}</div></li>
            </ul>
          </div>
        </li>
      );
    } else {
      return(
        <li class="card">
          <div>
            <h3 class="name">Error</h3>
            <h4>{this.props.message}</h4>
          </div>
        </li>
      );
    }
  }
}

export default class MarketStatusAPI extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currencyPairTips: '',
      currencyPairCalc: '',
      operation: '',
      amount: 0,
      cap: 0,
      tipsApiResults: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleGetTips = this.handleGetTips.bind(this);
  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value}) 
  }

  async handleGetTips(event){
    event.preventDefault();
    console.log(process.env.REACT_APP_MARKET_STATUS_BASE_URL + '/tips/' + this.state.currencyPairTips);
    const resp = await fetch(process.env.REACT_APP_MARKET_STATUS_BASE_URL + '/tips/' + this.state.currencyPairTips);
    const data = await resp.json();
    this.setState({tipsApiResults: <Card {...data}/>})
  }

  render(){
    return(
      <div>
        <h2>API REST</h2>
        <h3>Tips</h3>
        <form id="tips-api" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input type="text" placeholder="BTC-USD" name="currencyPairTips" value={this.state.currencyPairTips} onChange={this.handleChange} required/>
          <br/> <button onClick={this.handleGetTips}>Get</button>
          <br/> <div id="tips-api-result">{this.state.tipsApiResults}</div>
        </form>
        <h3>Calculate Price</h3>
        <form id="calculate-api" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input type="text" placeholder="BTC-USD" name="currencyPairCalc" value={this.state.currencyPairCalc} onChange={this.handleChange} required/>
          <br/> <label><strong>Operation</strong></label> 
          <br/> <input type="text" placeholder="buy/sell" name="operation" value={this.state.operation} onChange={this.handleChange} required/>
          <br/> <label><strong>Amount</strong></label> 
          <br/> <input type="number" placeholder={0} name="amount" value={this.state.amount} onChange={this.handleChange} required/>
          <br/> <label><strong>Cap (optional)</strong></label> 
          <br/> <input type="number" placeholder={0} name="cap" value={this.state.cap} onChange={this.handleChange} required/>
          <br/> <button>Post</button>
          <br/> <div id="tips-calc-result"></div>
        </form>
      </div>
    );
  }
}