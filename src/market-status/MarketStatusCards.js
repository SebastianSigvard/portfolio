import React from 'react';

export class CardTips extends React.Component {
  render() {
    if (this.props.status === 'success') {
      return (
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
      return (
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

export class CardCalc extends React.Component {
  render() {
    if (this.props.status === 'success') {
      return (
        <li className="card-market-status-calc">
          <div>
            <h3 className="name">{this.props.currencyPairTips}</h3>
            <h4>{this.props.operation}</h4>
            <ul className="macros">
              <li><div><strong>Cap Reached</strong></div>
                <div className="value">{this.props.capReached? 'True' : 'False'}</div>
              </li>
              <li><div><strong>Amount</strong></div>
                <div className="value">{Number(this.props.data.amount).toFixed(6)}</div>
              </li>
              <li><div><strong>Efective Price</strong></div>
                <div className="value">{Number(this.props.data.efectivePrice).toFixed(2)}</div>
              </li>
            </ul>
          </div>
        </li>
      );
    } else {
      return (
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
