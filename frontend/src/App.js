import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import './bootstrap.css';

//import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'


class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp></TodoApp> 
      </div>
    );
  }
}

export default App;


// class App extends Component {   // The counter App
//   render() {
//     return (
//       <div className="App">
//         <Counter></Counter> 
//       </div>
//     );
//   }
// }