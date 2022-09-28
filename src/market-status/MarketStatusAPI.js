import React from 'react'
// import dotenv from 'dotenv';
// dotenv.config();

class CardTips extends React.Component {
  render(){
    if(this.props.status === 'success'){
      return(
        <li className="card-market-status">
          <div>
            <h3 className="name">{this.props.currencyPair}</h3>
            <h4>Bid</h4>
            <ul>
              <li><div><strong>Quantity</strong></div><div>{this.props.data.bid.quantity}</div></li>
              <li><div><strong>Rate</strong></div><div>{Number(this.props.data.bid.rate).toFixed(2)}</div></li>
            </ul>
            <h4>Ask</h4>
            <ul>
              <li><div><strong>Quantity</strong></div><div>{this.props.data.ask.quantity}</div></li>
              <li><div><strong>Rate</strong></div><div>{Number(this.props.data.ask.rate).toFixed(2)}</div></li>
            </ul>
          </div>
        </li>
      );
    } else {
      return(
        <li className="card">
          <div>
            <h3 className="name">Error</h3>
            <h4>{this.props.message}</h4>
          </div>
        </li>
      );
    }
  }
}

class CardCalc extends React.Component {
  render(){
    if(this.props.status === 'success'){
      return(
        <li className="card-market-status-calc">
          <div>
            <h3 className="name">{this.props.currencyPairTips}</h3>
            <h4>{this.props.operation}</h4>
            <ul className="macros">
              <li><div><strong>Cap Reached</strong></div><div className="value">{this.props.capReached? "True" : "False"}</div></li>
              <li><div><strong>Amount</strong></div><div className="value">{Number(this.props.data.amount).toFixed(6)}</div></li>
              <li><div><strong>Efective Price</strong></div><div className="value">{Number(this.props.data.efectivePrice).toFixed(2)}</div></li>
            </ul>
          </div>
        </li>
      );
    } else {
      return(
        <li className="card">
          <div>
            <h3 className="name">Error</h3>
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
    console.log(data);
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