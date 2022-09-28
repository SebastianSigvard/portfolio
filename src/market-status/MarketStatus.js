import React from 'react'
import MarketStatusAPI from './MarketStatusAPI';
import MarketStatusWEBS from './MarketStatusWEBS';
import './market-status.css'

export default class MarketStatus extends React.Component {
    render(){
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