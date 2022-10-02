import React from 'react';
import nftTestAbi from './nftTestAbi';

export default class NftMinter extends React.Component {
  constructor(props) {
    super(props);
    console.log(process.env.REACT_APP_NFT_TEST_ADDRESS);
    const nftTestContract = new this.props.web3js.eth.Contract(nftTestAbi, process.env.REACT_APP_NFT_TEST_ADDRESS);

    this.state = {
      response: null,
      nftTestContract,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const resp = await this.state.nftTestContract.methods.name().call();
    this.setState({response: JSON.stringify(resp)});
  }

  render() {
    return (
      <div className="container">
        <h2>NftMinter</h2>
        <button onClick={this.handleClick}>Get Nft Collection Name</button>
        <div>{this.state.response}</div>
      </div>
    );
  }
}
