import React from 'react'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        wWidth: window.innerWidth,
        menuDisplayed: false,
    };

    window.addEventListener('resize', () => {
        this.setState({wWidth: window.innerWidth});
    });
  }

  render() {
    let displayNav = this.state.wWidth > 870 ? "flex" : "none";
    displayNav = this.state.menuDisplayed ? "flex" : displayNav;

    return (
        <div class="navbar">
            <div class="container">
                <h1 class="navbar-name"><span>Sig</span>vard</h1>
                <img id="mobile-cta" class="mobile-menu" src="images/menu.svg" alt="Open navegation menu" onClick={()=>this.setState({menuDisplayed: true})}/>
                <nav style={{display : displayNav}}>
                    <img id="mobile-exit" class="mobile-menu-exit" src="images/x.svg" alt="Close navegation menu" onClick={()=>this.setState({menuDisplayed: false})}/>
                    <ul class="primary-nav">
                        <li><a href="home">Home</a></li>
                        <li><a href="calcount">Calories Counter</a></li>
                        <li><a href="market-status">Market Status</a></li>
                    </ul>
                    <ul class="secondary-nav">
                        <li class="contact-cta"><a href="contact">Contact me</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
  }
}
