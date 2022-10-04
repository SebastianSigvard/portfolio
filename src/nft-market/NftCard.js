import React from 'react';

export default class NftCard extends React.Component {
  render() {
    return (
      <div className="nft-card">
        <img className="nft-image" src={this.props.src}/>
        <h4 className='nft-name'>{this.props.name}</h4>
        <p className='nft-description'>{this.props.description}</p>
      </div>
    );
  }
}
