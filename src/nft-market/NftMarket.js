import NftMinter from './NftMinter';
import NoMetaMask from './NoMetaMask';
import Web3 from 'web3';
import React from 'react';
import './nft-market.css';

export default class NftMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metaMaskInstalled: false,
      web3js: null,
    };
  }

  componentDidMount() {
    if (window.web3) {
      const web3js = new Web3(window.ethereum);
      this.setState({metaMaskInstalled: true, web3js});
    }
  }

  render() {
    return (
      <section className="hero-nft">
        {!this.state.metaMaskInstalled && <NoMetaMask />}
        {this.state.metaMaskInstalled && <NftMinter web3js={this.state.web3js}/>}
      </section>
    );
  }
}
