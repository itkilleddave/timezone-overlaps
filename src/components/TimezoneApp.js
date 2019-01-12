import React, { Component } from 'react'
import City from './City';

class TimezoneApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			position : [],
		}
		this.handleMouseEnterCityTimeRow = this.handleMouseEnterCityTimeRow.bind(this);
	}

	handleMouseEnterCityTimeRow(position) {

		this.setState({
			position : position
		})
	}

	render() {

		//console.log('position', this.state.position); 

		const cities = this.props.cities;
		const position = this.state.position;

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
							active={ (index===position.column) ? true : false }
							activeTimeRow={position.row}
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