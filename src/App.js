import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todo/Todos'
import Header from './components/layout/Header';
import AddTodo from './components/Todo/AddTodo';
//import uuid from 'react-uuid';
import './App.css';
import About from './components/pages/About';
import axios from 'axios';

class App extends React.Component {

  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20').then(response => this.setState({
      todos: response.data
    }))
  }

  //Toggle checkbox item
  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  // Delete item
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(response => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
  }

  //Add item
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    }).then(response => this.setState({ todos: [...this.state.todos, response.data] }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="conatiner">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
