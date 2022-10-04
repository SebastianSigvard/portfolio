import nftTestAbi from './nftTestAbi';
import NftCard from './NftCard';
import React from 'react';

export default class NftMinter extends React.Component {
  constructor(props) {
    super(props);
    const nftTestContract = new this.props.web3js.eth.Contract(nftTestAbi, process.env.REACT_APP_NFT_TEST_ADDRESS);

    this.state = {
      name: '',
      description: '',
      response: null,
      nftTestContract,
      image: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleClick() {
    const resp = await this.state.nftTestContract.methods.name().call();
    this.setState({response: JSON.stringify(resp)});
  }

  async onImageChange(event) {
    if (!event.target.files[0]) return;

    this.setState({image: event.target.files[0]});
  }

  handleChange(event) {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="container-nft-minter">
        <h2>Mint a NFT</h2>
        <label className="custom-file-upload">
          <input type="file" accept="image/*" onChange={this.onImageChange}/>
          Upload Image
        </label>
        <form>
          <input type="text" placeholder="NFT Name" name="name"
            value={this.state.name} onChange={this.handleChange}/>
          <input type="text" placeholder="Description" name="description"
            value={this.state.description} onChange={this.handleChange}/>
        </form>
        <br/>
        <NftCard src={this.state.image? URL.createObjectURL(this.state.image) : ''}
          name={this.state.name}
          description={this.state.description}/>
        <br/>
        <button onClick={this.handleClick}>Get Nft Collection Name</button>
        <div>{this.state.response}</div>
      </div>
    );
  }
}
