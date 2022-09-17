import React from 'react'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }

  render() {
    return (
        <div class="navbar">
            <div class="container">
                <h1 class="navbar-name"><span>Sig</span>vard</h1>
                <nav>
                    <ul class="primary-nav">
                        <li class="current">Home</li>
                        <li><a href="calcount.html">Calories Counter</a></li>
                        <li><a href="market-status.html">Market Status</a></li>
                    </ul>
                    <ul class="secondary-nav">
                        <li class="contact-cta"><a href="contact.html">Contact me</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
  }
}
