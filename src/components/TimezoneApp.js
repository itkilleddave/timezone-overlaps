import React, { Component } from 'react'
import City from './City';

class TimezoneApp extends Component {

	render() {

		const cities = this.props.cities;

		return (
			<div className="timezone-app">
				<div className="container">
					{cities.map((city) => (
						<div className="item" key={city.name}>
							<City 
							name={city.name} 
							country={city.country} 
							countryCode={city.countryCode} 
							timezone={city.timezone} 
							/>
						</div>
					)
					)}
				</div>
			</div>
		)
	}
}

export default TimezoneApp