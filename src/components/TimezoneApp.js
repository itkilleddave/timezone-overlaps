import React, { Component } from 'react'
import City, { CityHead } from './City';

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
				<div className="container container-header">
					{cities.map((city, index) => (
						<div className="item" key={city.name}>
							<CityHead 
							name={city.name} 
							country={city.country} 
							countryCode={city.countryCode}
							timezone={city.timezone} 
							columnIndex={index} 
							active={ (index===position.column) ? true : false }
							/>
						</div>
					)
					)}
				</div>
				<div className="container container-content">
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
				<AddCityButton />
			</div>
		)
	}
}


class AddCityButton extends Component {

	render() {

		return <button className="btn btn-circle btn-bottom-right">Add<br />City</button>
		
	}
}

export default TimezoneApp