import React from 'react'
import './contact-me.css'

export default class ContactMe extends React.Component {
    render(){
        return (
        <section class="hero">
            <div class="container">
                <h2>Send Me a Message</h2>
                <form id="contact-form" class="main-panel">
                    <label><strong>Name</strong></label> 
                    <br/>  
                    <input id="contact-name" type="text" name="name" required />
                    <br/>
                    <label><strong>Your Email</strong></label>
                    <br/>
                    <input id="contact-email" type="text" name="email" required />
                    <br/>
                    <label><strong>Message</strong></label>
                    <br/>
                    <textarea id="contact-message" name="message"></textarea>
                    <br/>
                    <button id="send-button" type="submit">Send</button>
                </form>        
            </div>
        </section>
        );
    }
}