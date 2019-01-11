import React, { Component } from 'react';
import './App.css';
import TimezoneApp from './components/TimezoneApp';

// 'cities' data will eventually come from a database/api. 
// For nore, use this:
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

const cities = [
  {
    name: "Adelaide",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Adelaide",
  },
  {
    name: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Melbourne",
  },
  {
    name: "New York",
    country: "United States",
    countryCode: "US",
    timezone: "America/New_York",
  },
  {
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    timezone: "Europe/London",
  },
  {
    name: "Shanghai",
    country: "China",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
  },
  {
    name: "Cairo",
    country: "Egypt",
    countryCode: "EG",
    timezone: "Africa/Cairo",
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    timezone: "America/Argentina/Buenos_Aires",
  },
  {
    name: "Manila",
    country: "Philippines",
    countryCode: "PH",
    timezone: "Asia/Manila",
  },
  {
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    timezone: "Asia/Tokyo",
  },
]

class App extends Component {
  render() {
    return (
      <div className="app">
        <TimezoneApp cities={cities} />
      </div>
    );
  }
}

export default App;
