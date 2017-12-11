import React, { Component } from 'react';
import { BrowserRouter  as Router, Route} from 'react-router-dom';
import NavBar from './NavBar';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
        </div>
      </Router> 
    );
  }
}

export default App;
