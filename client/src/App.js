import React, { Component } from 'react';
import './App.css';
import TimezoneApp from './components/TimezoneApp';

class App extends Component {


  //// express test /////////////////////

  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  ///////////////////////////////////////

  render() {
    return (
      <div className="app">
      	<h1>{this.state.response}</h1> {/*express test*/}
        <TimezoneApp />
      </div>
    );
  }
}

export default App;
