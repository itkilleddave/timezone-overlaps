import React, { Component } from 'react'
import City, { CityHead } from './City'
import DatePicker from './DatePicker'
import Button, { BUTTON } from './Button'
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'

function getEmptyCity() {
	return {
				name: "",
				country: "",
				//countryCode: "",
				//timezone: "",
			}
}

class TimezoneApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cities : [getEmptyCity()],
			position : [],
			dateTime : new Date(),
			datePicker : {
				active : false
			}
		}

		// date handlers
		this.handleClickChangeDate = this.handleClickChangeDate.bind(this)
		this.handleClickSetDate = this.handleClickSetDate.bind(this)
		this.handleClickSetDay = this.handleClickSetDay.bind(this)
		this.handleClickSetMonth = this.handleClickSetMonth.bind(this)
		this.handleClickSetYear = this.handleClickSetYear.bind(this)

		//city handlers
		this.handleClickAddCity = this.handleClickAddCity.bind(this)
		this.handleClickConfirmAddCity = this.handleClickConfirmAddCity.bind(this)
		this.handleClickRemoveCity = this.handleClickRemoveCity.bind(this)
		this.handleMouseEnterCityTimeRow = this.handleMouseEnterCityTimeRow.bind(this)
	}

	handleClickChangeDate() {
		
		const dp = {...this.state.datePicker, active:true}

		this.setState({datePicker: dp})

	}
	handleClickSetDate() {
		
		const dp = {...this.state.datePicker, active:false}

		this.setState({datePicker: dp})

	}
	handleClickSetDay() {
	
		alert('handleClickSetDay')

	}
	handleClickSetMonth(monthIndex) {
		
		const date = new Date(this.state.dateTime)

		console.log(monthIndex);

		this.setState({dateTime: date.setMonth(monthIndex)})

	}
	handleClickSetYear() {
		
		alert('handleClickSetYear')

	}
	handleClickAddCity() {

		const cities = [...this.state.cities, getEmptyCity()]

		this.setState({cities: cities})


	}
	handleClickConfirmAddCity(cityData) {

		//console.log('cityData', cityData);

		const cities = this.state.cities.concat()

		cities[cityData.index] = cityData.props

		// add this line conditionally when 'add-another' funcationality is implemented
		//cities.push(getEmptyCity())

		this.setState({cities: cities})



	}
	handleClickRemoveCity(cityData) {

		const cities = this.state.cities.concat()

		cities.splice(cityData.index, 1)

		// if(!cities.length) {
		// 	cities[0] = getEmptyCity();
		// }

		this.setState({cities: cities})
	}
	handleMouseEnterCityTimeRow(position) {
		this.setState({
			position : position
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if(this.state.cities.length > prevState.cities.length) {

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
				onClickSetDay={this.handleClickSetDay}
				onClickSetMonth={this.handleClickSetMonth}
				onClickSetYear={this.handleClickSetYear}
				dateTime={this.state.dateTime}
				>
				</DatePicker>
				<div className="container container-header">
					{cities.map((city, index) => (
						<div 
						className={'item '+(!city.name ? 'new' : 'set')} 
						key={index}>
							<CityHead 
							name={city.name} 
							country={city.country} 
							//countryCode={city.countryCode}
							//timezone={city.timezone} 
							columnIndex={index} 
							active={ (index===position.column) ? true : false }
							onClickRemove={this.handleClickRemoveCity}
							/>
						</div>
					)
					)}
				</div>
				<div className="container container-content">
					{cities.map((city, index) => (
						<div 
						className={'item '+(!city.name ? 'new' : 'set')} 
						key={index}>
							<City 
							name={city.name} 
							country={city.country} 
							lat={city.lat}
							lon={city.lon}
							dateTime={this.state.dateTime}
							//countryCode={city.countryCode} 
							//timezone={city.timezone} 
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
					{!cities[cities.length-1].name
					? 
					false // only allow 1 new city to be added at a time
					:
					<Button 
					icon={faPlus}
					shape={BUTTON.SHAPE.CIRCLE}
					onClick={this.handleClickAddCity}
					pulse={
						(!cities.length)
						||
						(cities.length===1 && cities[0].name !== '')
						? true : false}
					//pulse={ cities.length ? true : false} 
					/>
					}
				</div>
			</div>

		)

		
	}
}


export default TimezoneApp