import React from 'react'

export default class MarketStatusAPI extends React.Component {
  render(){
    return(
      <div>
        <h2>API REST</h2>
        <h3>Tips</h3>
        <form id="tips-api" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input id="currency-pair-tip" type="text" placeholder="BTC-USD" name="currency pair" required/>
          <br/> <button id="tips-api-button" type="submit">Get</button>
          <br/> <div id="tips-api-result"></div>
        </form>
        <h3>Calculate Price</h3>
        <form id="calculate-api" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input id="currency-pair-calc" type="text" placeholder="BTC-USD" name="currency pair" required/>
          <br/> <label><strong>Operation</strong></label> 
          <br/> <input id="operation" type="text" placeholder="buy/sell" name="Operation" required/>
          <br/> <label><strong>Amount</strong></label> 
          <br/> <input id="amount" type="number" placeholder={0} name="Amount" required/>
          <br/> <label><strong>Cap (optional)</strong></label> 
          <br/> <input id="cap" type="number" placeholder={0} name="cap" value="0" required/>
          <br/> <button id="calc-api-button" type="submit">Post</button>
          <br/> <div id="tips-calc-result"></div>
        </form>
      </div>
    );
  }
}