import React, { Component } from 'react'

import AuthenticationService from './AuthenticationService.js'


class LoginComponent extends Component{
    constructor(){  //make sure that any properties are passed to the super class
        super(); //need to call super() to use this in the next line
        this.state = {
            username: 'type username...', 
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value});
    }
    loginClicked(){
        // if(this.state.username === 'zemser' && this.state.password === '123'){
        //     AuthenticationService.registerSuccesfullLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }
        // else {
        //     this.setState({hasLoginFailed:true})
        //     this.setState({showSuccessMessage:false})
        // }
        // AuthenticationService.exectueBasicAuthenticationService(this.state.username, this.state.password)
        // .then(() => {
        //     AuthenticationService.registerSuccesfullLogin(this.state.username, this.state.password);
        //             this.props.history.push(`/welcome/${this.state.username}`)
        //         })
        // .catch(() => {
        //     this.setState({hasLoginFailed:true})
        //     this.setState({showSuccessMessage:false})
        // })
        AuthenticationService.exectueJwtAuthenticationService(this.state.username, this.state.password)
        .then((res) => {
            AuthenticationService.registerSuccesfullLoginForJwt(this.state.username, res.data.token);
                    this.props.history.push(`/welcome/${this.state.username}`)
                })
        .catch(() => {
            this.setState({hasLoginFailed:true})
            this.setState({showSuccessMessage:false})
        })
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
                    Password: <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                    <button className="btn btn-success" onClick={this.loginClicked} >Login</button>
                </div>
               
            </div>
        )
    }
}

export default LoginComponent;