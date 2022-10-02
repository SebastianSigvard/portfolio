import React from 'react';
import './navbar.css';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wWidth: window.innerWidth,
      menuDisplayed: false,
    };
    this.resizeHandler = () => {
      this.setState({wWidth: window.innerWidth});
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    let displayNav = this.state.wWidth > 870 ? 'flex' : 'none';
    displayNav = this.state.menuDisplayed ? 'flex' : displayNav;

    const styles = {};
    styles['home'] = 'normal';
    styles['cal-count'] = 'normal';
    styles['market-status'] = 'normal';

    const path = window.location.href.slice(26);
    if (path === '') {
      styles['home'] = 'bold';
    } else if (path === 'cal-count') {
      styles['cal-count'] = 'bold';
    } else if (path === 'market-status') {
      styles['market-status'] = 'bold';
    }

    return (
      <div className="navbar">
        <div className="container">
          <h1 className="navbar-name"><span>Sig</span>vard</h1>
          <img id="mobile-cta" className="mobile-menu" src="images/menu.svg" alt="Open navegation menu"
            onClick={()=>this.setState({menuDisplayed: true})}/>

          <nav style={{display: displayNav}}>
            <img id="mobile-exit" className="mobile-menu-exit" src="images/x.svg" alt="Close navegation menu"
              onClick={()=>this.setState({menuDisplayed: false})}/>

            <ul className="primary-nav">
              <li>
                <a href="/">
                  {styles['home'] === 'bold'? <b>Home</b> : 'Home' }
                </a>
              </li>
              <li>
                <a href="cal-count">
                  {styles['cal-count'] === 'bold'? <b>Calories Counter</b> : 'Calories Counter' }
                </a>
              </li>
              <li>
                <a href="market-status">
                  {styles['market-status'] === 'bold'? <b>Market Status</b> : 'Market Status' }
                </a>
              </li>
            </ul>
            <ul className="secondary-nav">
              <li className="contact-cta"><a href="contact">Contact me</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
