import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import HellowWorldService from '../../api/todo/HelloWorldService.js'


class WelcomeComponent extends Component {
    constructor(props){  //make sure that any properties are passed to the super class
        super(props); //need to call super() to use this in the next line
        this.state = {
            welcomeMessage : ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccsessfulResponse = this.handleSuccsessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get customized message
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveWelcomeMessage(){
        HellowWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(res => this.handleSuccsessfulResponse(res))
        .catch(err => this.handleError(err))
    }
    handleSuccsessfulResponse(response){
        this.setState({welcomeMessage : response.data.message})
    }
    handleError(err){
        //console.log(err.response)
        let errorMessage = ''
        if(err.message)
            errorMessage += err.message
        if(err.response && err.response.data)
            errorMessage += err.response.data.message
        this.setState({welcomeMessga: errorMessage})
    }
}

export default WelcomeComponent;