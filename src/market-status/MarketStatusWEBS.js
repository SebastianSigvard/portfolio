import React from 'react'
import { CardTips } from './MarketStatusCards';

export default class MarketStatusWEBS extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currencyPairTips: '',
      currencyPairCalc: '',
      operation: '',
      amount: 0,
      cap: '',
      tipsWEBSResults: null,
      calcWEBSResults: null,
      socket: null,
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleGetTips = this.handleGetTips.bind(this);
  }

  async componentDidMount(){
    const socket = new WebSocket(process.env.REACT_APP_MARKET_STATUS_WEBS_URL);
    this.setState({socket})
    socket.addEventListener('open', () => console.log(`connected!`));

    socket.addEventListener('message', event => {
      const dataj = JSON.parse(event.data);
      console.log(dataj)
  
      if(dataj.method === "tips-response") {
        this.setState({tipsWEBSResults: <CardTips {...dataj.data} />});
      } 
    });
  }

  async componentWillUnmount(){

  }

  async handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value}) 
  }

  async handleGetTips(event){
    event.preventDefault();
    this.state.socket.send(JSON.stringify({method: "tips", currencyPair: this.state.currencyPairTips}));
  }

  render(){
    return(
      <div>
        <h2>WEBScoket</h2>
        <h3>Tips</h3>
        <form>
          <label><strong>Currency Pair</strong></label> 
          <br/> <input type="text" placeholder="BTC-USD" name="currencyPairTips" value={this.state.currencyPairTips} onChange={this.handleChange} required/>
          <br/> <button onClick={this.handleGetTips}>Send</button>
          <br/> <div>{this.state.tipsWEBSResults}</div>
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
          <br/> <button>Send</button>
          <br/> <div></div>
        </form>
      </div>
    );
  }
}