import React, { Component } from 'react';
import './App.css';
import TimezoneApp from './components/TimezoneApp';

// hardcoded dat for testing

 const testCityData = [
 	{
	adminCode: "05",
	country: "AU",
	featureCode: "PPLA",
	lat: -34.92866,
	lon: 138.59863,
	name: "Adelaide",
	population: 1225235,
	},
	{
	adminCode: "NCR",
	country: "PH",
	featureCode: "PPLC",
	lat: 14.6042,
	lon: 120.9822,
	name: "Manila",
	population: 10444527,
	},
 	{
	adminCode: "05",
	country: "AU",
	featureCode: "PPLA",
	lat: -34.92866,
	lon: 138.59863,
	name: "Adelaide",
	population: 1225235,
	},
	{
	adminCode: "NCR",
	country: "PH",
	featureCode: "PPLC",
	lat: 14.6042,
	lon: 120.9822,
	name: "Manila",
	population: 10444527,
	},
]

class App extends Component {
	
  render() {
    return (
      <div className="app">
        <TimezoneApp testCityData={testCityData} />
      </div>
    );
  }
}

export default App;
