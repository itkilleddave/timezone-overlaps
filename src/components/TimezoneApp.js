import React, { Component } from 'react'
import City, { CityHead } from './City'
import cities from '../Data'
import DatePicker from './DatePicker'
import Button, { BUTTON_SHAPE } from './Button'
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'

class TimezoneApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cities : cities,
			position : [],
			datePicker : {
				active : false
			}
		}
		this.handleMouseEnterCityTimeRow = this.handleMouseEnterCityTimeRow.bind(this)
		this.handleClickChangeDate = this.handleClickChangeDate.bind(this)
		this.handleClickSetDate = this.handleClickSetDate.bind(this)
		this.handleClickAddCity = this.handleClickAddCity.bind(this)
	}

	handleMouseEnterCityTimeRow(position) {
		this.setState({
			position : position
		})
	}
	handleClickChangeDate() {
		
		const dp = {...this.state.datePicker, active:true}

		this.setState({datePicker: dp});

		console.log('handleClickChangeDate', this.state.datePicker);
	}
	handleClickSetDate() {
		
		const dp = {...this.state.datePicker, active:false}

		this.setState({datePicker: dp});

		console.log('handleClickSetDate', this.state.datePicker);
	}
	handleClickAddCity() {

		console.log('handleClickAddCity', cities);

		const cities = [...this.state.cities, {
			name: "",
			country: "",
			countryCode: "",
			timezone: "",
		}]

		this.setState({cities: cities});


	}
	render() {

		//console.log('position', this.state.position); 

		const cities = this.state.cities;
		const position = this.state.position;

		return (
			<div className="timezone-app">
				<DatePicker
				active={this.state.datePicker.active}
				onClickSetDate={this.handleClickSetDate}
				>
				</DatePicker>
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
				<div className="btn-bottom-left">
					<Button 
					icon={faCalendar}
					shape={BUTTON_SHAPE.CIRCLE}
					onClick={this.handleClickChangeDate} 
					/>
				</div>
				<div className="btn-bottom-right">
					<Button 
					icon={faPlus}
					shape={BUTTON_SHAPE.CIRCLE}
					onClick={this.handleClickAddCity}  
					/>
				</div>
			</div>
		)
	}
}


export default TimezoneApp