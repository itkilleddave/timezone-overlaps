import React, { Component } from 'react'
import City from './City';

class TimezoneApp extends Component {

	constructor(props) {

		super(props);
		this.handleMouseEnterCityTimeRow = this.handleMouseEnterCityTimeRow.bind(this);
	}

	handleMouseEnterCityTimeRow(position) {
		console.log('position', position); 
	}

	render() {

		const cities = this.props.cities;

		return (
			<div className="timezone-app">
				<div className="container">
					{cities.map((city, index) => (
						<div className="item" key={city.name}>
							<City 
							name={city.name} 
							country={city.country} 
							countryCode={city.countryCode} 
							timezone={city.timezone} 
							columnIndex={index}
							onMouseEnter={this.handleMouseEnterCityTimeRow}
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