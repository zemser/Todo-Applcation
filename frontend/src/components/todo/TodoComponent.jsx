import React, { Component } from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'


class TodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:  this.props.match.params.id, 
            description: '',
            targetDte: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    //called after render
    componentDidMount(){
        if(this.state.id === -1) return
        let username =AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then( res =>{
                this.setState({description: res.data.description, targetDate: moment(res.data.targetDte).format('YYYY-MM-DD')})
            })
    }
 
    validate(values) { //called inside the Formik to validate the info upon submiting 
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if(values.description.length<5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if(!moment(values.targetDte).isValid()) {
            errors.targetDte = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) { 
        let username =AuthenticationService.getLoggedInUserName();
        let todo = { id: this.state.id, description: values.description, targetDte: values.targetDte}
        if(this.state.id === -1){ // new todo
            TodoDataService.createTodo(username, todo)
        }else{
            TodoDataService.updateTodo(username, this.state.id, todo)
        .then(() =>this.props.history.push(`/todos`))
        
        console.log(values);
        }
        
    }

  
    render() {
        let {description,targetDte} = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container"></div>
                    <Formik
                        initialValues={{description,targetDte}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false} //until i click save there is no validation
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >   
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" 
                                                                className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDte"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type='submit'>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                
            </div>
        )
    }
}


export default TodoComponent;