import React, { Component } from 'react'
import City, { CityHead } from './City'
import cities from '../Data'
import DatePicker from './DatePicker'
import Button, { BUTTON } from './Button'
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
		this.handleClickConfirmAddCity = this.handleClickConfirmAddCity.bind(this)
		this.handleClickRemoveCity = this.handleClickRemoveCity.bind(this)
	}

	handleMouseEnterCityTimeRow(position) {
		this.setState({
			position : position
		})
	}
	handleClickChangeDate() {
		
		const dp = {...this.state.datePicker, active:true}

		this.setState({datePicker: dp});

	}
	handleClickSetDate() {
		
		const dp = {...this.state.datePicker, active:false}

		this.setState({datePicker: dp});

	}
	handleClickAddCity() {

		const cities = [...this.state.cities, {
			name: "",
			country: "",
			countryCode: "",
			timezone: "",
		}]

		this.setState({cities: cities})


	}
	handleClickConfirmAddCity(cityData) {

		const cities = this.state.cities.concat()

		cities[cityData.index] = cityData.props

		this.setState({cities: cities})

	}
	handleClickRemoveCity(cityData) {

		const cities = this.state.cities.concat()

		cities.splice(cityData.index, 1)

		this.setState({cities: cities})
	}
	componentDidUpdate(prevProps, prevState, snapshot) {

		//console.log('prevState.cities', prevState.cities); 

		if(this.state.cities.length > prevState.cities.length) {

			// city was added

			window.scrollTo({
			  top: 0,
			  left: document.body.scrollWidth,
			  behavior: 'smooth'
			})
		}
	}
	render() {


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
						<div 
						className={'item '+(!city.name ? 'new' : '')} 
						key={index}>
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
						<div 
						className={'item '+(!city.name ? 'new' : '')} 
						key={index}>
							<City 
							name={city.name} 
							country={city.country} 
							countryCode={city.countryCode} 
							timezone={city.timezone} 
							columnIndex={index}
							onMouseEnter={this.handleMouseEnterCityTimeRow}
							active={ (index===position.column) ? true : false }
							activeTimeRow={position.row}
							onClickAdd={this.handleClickConfirmAddCity}
							onClickRemove={this.handleClickRemoveCity}
							/>
						</div>
					)
					)}
				</div>
				<div className="btn-bottom-left">
					<Button 
					icon={faCalendar}
					shape={BUTTON.SHAPE.CIRCLE}
					onClick={this.handleClickChangeDate} 
					/>
				</div>
				<div className="btn-bottom-right">
					<Button 
					icon={faPlus}
					shape={BUTTON.SHAPE.CIRCLE}
					onClick={this.handleClickAddCity}  
					/>
				</div>
			</div>

		)

		
	}
}


export default TimezoneApp