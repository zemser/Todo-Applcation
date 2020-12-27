import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos : [],     
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);

    }
    componentDidMount(){
        this.refreshTodos();
    }
    refreshTodos(){
        let username =AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(res=>{
            this.setState({todos:res.data})
            })
    }

    deleteTodoClicked(id){
        let username =AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username,id)
        .then(
            res => {
               this.setState({message: `Delete of todo ${id} was successfull`})
               this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked(id){
        this.props.history.push(`/todos/-1`)
    }

  
    render() {
        
        return (
            <div>
                <h1>List Todo</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target Date</th>
                             <th>Is Completed?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{(moment(todo.targetDte).format('YYYY-MM-DD'))}</td>
                                <td>{todo.done.toString()}</td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                            </tr>   
                           )}
                       
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default ListTodosComponent;