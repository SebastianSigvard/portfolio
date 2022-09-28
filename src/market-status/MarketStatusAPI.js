import React from 'react'

export default class MarketStatusAPI extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currencyPairTips: '',
      currencyPairCalc: '',
      operation: '',
      amount: 0,
      cap: 0,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value}) 
  }

  render(){
    return(
      <div>
        <h2>API REST</h2>
        <h3>Tips</h3>
        <form id="tips-api" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input type="text" placeholder="BTC-USD" name="currencyPairTips" value={this.state.currencyPairTips} onChange={this.handleChange} required/>
          <br/> <button>Get</button>
          <br/> <div id="tips-api-result"></div>
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