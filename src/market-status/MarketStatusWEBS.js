import React from 'react'

export default class MarketStatusWEBS extends React.Component {
  render(){
    return(
      <div>
        <h2>WEBScoket</h2>
        <h3>Tips</h3>
        <form id="tips-ws" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input id="currency-pair-ws" type="text" placeholder="BTC-USD" name="currency pair" required/>
          <br/> <button id="tips-ws-button" type="submit">Send</button>
          <br/> <div id="tips-ws-result"></div>
        </form>
        <h3>Calculate Price</h3>
        <form id="calculate-ws" className="main-panel">
          <label><strong>Currency Pair</strong></label> 
          <br/> <input id="currency-pair-calc-ws" type="text" placeholder="BTC-USD" name="currency pair" required/>
          <br/> <label><strong>Operation</strong></label> 
          <br/> <input id="operation-ws" type="text" placeholder="buy/sell" name="Operation" required/>
          <br/> <label><strong>Amount</strong></label> 
          <br/> <input id="amount-ws" type="number" placeholder={0} name="Amount" required/>
          <br/> <label><strong>Cap (optional)</strong></label> 
          <br/> <input id="cap-ws" type="number" placeholder={0} name="cap" value="0" required/>
          <br/> <button id="calc-api-button-ws" type="submit">Send</button>
          <br/> <div id="tips-calc-result-ws"></div>
        </form>
      </div>
    );
  }
}