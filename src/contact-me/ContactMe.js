import React from 'react'
import './contact-me.css'

export default class ContactMe extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user_name: '',
            email: '',
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            const resp = await fetch('/contact-message', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                 "name": this.state.user_name,
                 "email": this.state.email,
                 "message": this.state.message
                })
            });
            
            if(resp.status === 200) {
                document.location.href="/";
                return;
            }
        } catch(e) {
            console.error(e);
        }
        // TODO fail card
    }

    render(){
        return (
        <section className="hero-contactme">
            <div className="container">
                <h2>Send Me a Message</h2>
                <form id="contact-form" className="main-panel">
                    <label><strong>Name</strong></label> 
                    <br/>  
                    <input id="contact-name" type="text" name="user_name" value={this.state.user_name} onChange={this.handleChange} required />
                    <br/>
                    <label><strong>Your Email</strong></label>
                    <br/>
                    <input id="contact-email" type="text" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <br/>
                    <label><strong>Message</strong></label>
                    <br/>
                    <textarea id="contact-message" name="message" value={this.state.message}  onChange={this.handleChange}></textarea>
                    <br/>
                    <button id="send-button" type="submit" onClick={this.handleSubmit}>Send</button>
                </form>        
            </div>
        </section>
        );
    }
}