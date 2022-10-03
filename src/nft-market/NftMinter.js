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
      image: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  async handleClick() {
    const resp = await this.state.nftTestContract.methods.name().call();
    this.setState({response: JSON.stringify(resp)});
  }

  async onImageChange(event) {
    console.log(event.target.files[0]);
    this.setState({image: event.target.files[0]});

    const resp = await fetch( 'https://freeimage.host/api/1/upload', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        key: '6d207e02198a847aa98d0a2a901485a5',
        action: 'upload',
        source: event.target.files[0],
        format: 'json'}),
    });
    const data = await resp.json();
    console.log(data);
  }

  render() {
    return (
      <div className="container">
        <h2>NftMinter</h2>
        <button onClick={this.handleClick}>Get Nft Collection Name</button>
        <div>{this.state.response}</div>
        <input type="file" accept="image/*" onChange={this.onImageChange} />
        {this.state.image !== null && <img src={URL.createObjectURL(this.state.image)}/>}
      </div>
    );
  }
}
