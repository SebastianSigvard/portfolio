import React from 'react'
import './home.css'

export default class Home extends React.Component {
    render(){
        return (
            <section class="hero">
            <div class="container">
                <div class="main-panel">
                    <h1 class="hero-name"><a href="/">Sebastián Sigvard</a></h1>
                    <p class="subhead">Blockchain Developer</p>
                    <a href="https://www.linkedin.com/in/claudio-sebastian-sigvard/"><img src="images/linkedin.svg" alt="linkedin"/></a>
                    <a href="https://github.com/SebastianSigvard"><img src="images/github.svg" alt="github"/></a>
                    <a href="https://www.instagram.com/sebasig/"><img src="images/instagram.svg" alt="github"/></a>
                </div>
            </div>
            </section>
        );
    }
}