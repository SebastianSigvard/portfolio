import MarketStatusWEBS from './MarketStatusWEBS';
import MarketStatusAPI from './MarketStatusAPI';
import './market-status.css';
import React from 'react';

export default class MarketStatus extends React.Component {
  render() {
    return (
      <section className="hero-market-status">
        <div className="container">
          <MarketStatusAPI />
          <MarketStatusWEBS />
        </div>
      </section>
    );
  }
}
