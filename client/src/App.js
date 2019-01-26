import React, { Component } from 'react';
import './App.css';
import TimezoneApp from './components/TimezoneApp';

class App extends Component {
  render() {
    return (
      <div className="app">
        <TimezoneApp />
      </div>
    );
  }
}

export default App;
