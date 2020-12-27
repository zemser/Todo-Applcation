import React, { Component } from 'react'
import './Counter.css'

class Counter extends Component{
    constructor(){
        super(); //need to call super() to use this in the next line
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this); //now we can call this inside method increment() || u can use the fucntuons to arrow and then to not need that
        this.decrement = this.decrement.bind(this);
        this.rest = this.rest.bind(this);
    }
    render() {
        return (
          <div className="Counter">
             <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
             <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
             <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
             <div><button className="reset" onClick={this.rest}>Reset</button></div>
             <span className="count">{this.state.counter}</span>
            
          </div>
        );
      }

      rest(){
        this.setState({counter: 0});
      }

      increment(by){
        // this.setState({
        //     counter: this.state.counter + by
        // });
        this.setState(
            (prevState) => {
             return {counter: prevState.counter + by}
            });
        }
        decrement(by){
            // this.setState({
            //     counter: this.state.counter + by
            // });
            this.setState(
                (prevState) => {
                 return {counter: prevState.counter - by}
                }
            );
    }
}

class CounterButton extends Component{
    constructor(){
        super(); //need to call super() to use this in the next line
        // this.state = {
        //     counter: 0
        // }
        this.increment = this.increment.bind(this); //now we can call this inside method increment() || u can use the fucntuons to arrow and then to not need that
        this.decrement = this.decrement.bind(this);
    }
    
    render(){
        return (
            <div className="CounterButton">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
            </div>
        )
    }

    increment(){
        // this.setState({
        //     counter: this.state.counter + this.props.by
        // });
        this.props.incrementMethod(this.props.by);
    }

    decrement(){
        this.props.decrementMethod(this.props.by);
    }
   
}

CounterButton.defaultProps = {
    by: 1
}

export default Counter
