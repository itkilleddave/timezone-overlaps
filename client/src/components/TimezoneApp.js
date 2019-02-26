import React, { Component } from 'react'
import City, { CityHead } from './City'
import DatePicker from './DatePicker'
import CityPicker from './CityPicker'
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

		const dateTime = new Date()
		dateTime.setHours(0,0,0,0)

		this.state = {
			cities : [getEmptyCity()],
			position : [],
			dateTime : dateTime,
			datePicker : {
				active : false
			},
			cityPicker : {
				active : false
			},
		}

		// datePicker handlers
		this.handleClickChangeDate = this.handleClickChangeDate.bind(this)
		this.handleClickSetDate = this.handleClickSetDate.bind(this)
		this.handleClickSetDay = this.handleClickSetDay.bind(this)
		this.handleClickSetMonth = this.handleClickSetMonth.bind(this)
		this.handleClickSetYear = this.handleClickSetYear.bind(this)
		this.handleClickToday = this.handleClickToday.bind(this)

		//city handlers
		this.handleClickRemoveCity = this.handleClickRemoveCity.bind(this)
		this.handleMouseEnterCityTimeRow = this.handleMouseEnterCityTimeRow.bind(this)

		//cityPicker handlers
		this.handleClickCloseCityPicker = this.handleClickCloseCityPicker.bind(this)
		this.handleClickOpenCityPicker = this.handleClickOpenCityPicker.bind(this)
		this.handleClickAddCity = this.handleClickAddCity.bind(this)

	}

	componentDidMount() {

		// for testing

		if (this.props.testCityData) {

			this.setState({cities: this.props.testCityData})

		}

	}

	handleClickChangeDate() {
		
		const dp = {...this.state.datePicker, active:true}

		this.setState({datePicker: dp})

	}
	handleClickSetDate() {
		
		const dp = {...this.state.datePicker, active:false}

		this.setState({datePicker: dp})

	}
	handleClickSetDay(day) {
		
		const date = new Date(this.state.dateTime)

		date.setDate(day)

		this.setState({dateTime: date})

	}
	handleClickSetMonth(monthIndex) {

		const date = new Date(this.state.dateTime)
		
		const day = date.getDate()

		const year = this.state.dateTime.getYear()+1900

		const maxDaysInSelectedMonth = new Date(year, (monthIndex+1), 0).getDate();

		if (day > maxDaysInSelectedMonth) {
			date.setDate(maxDaysInSelectedMonth)
		}

		date.setMonth(monthIndex)

		this.setState({dateTime: date})

	}
	handleClickSetYear(year) {
		
		const date = new Date(this.state.dateTime)
		
		const day = date.getDate()
		const month = date.getMonth()

		const maxDaysInMonthOfSelectedYear = new Date(year, month+1, 0).getDate();

		if (day > maxDaysInMonthOfSelectedYear) {
			date.setDate(maxDaysInMonthOfSelectedYear)
		}

		date.setYear(year)

		this.setState({dateTime: date})

	}
	handleClickToday() {

		const date = new Date()
		date.setHours(0,0,0,0)

		this.setState({dateTime: date})
	}

	// cityPicker functions

	handleClickOpenCityPicker() {
		
		const cp = {...this.state.cityPicker, active:true}

		this.setState({cityPicker: cp})

	}
	handleClickCloseCityPicker() {
		
		const cp = {...this.state.cityPicker, active:false}

		this.setState({cityPicker: cp})
	}
	handleClickAddCity(cityData) {

		console.log('cityData', cityData);

		const cities = this.state.cities.concat(cityData.props)

		const cp = {...this.state.cityPicker, active:false}

		this.setState({
			cities: cities,
			cityPicker: cp,
		})

	}

	// city functions

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

	// standard react events

	componentDidUpdate(prevProps, prevState, snapshot) {

		if(this.state.cities.length > prevState.cities.length) {

			window.scrollTo({
			  //top: 0,
			  left: document.body.scrollWidth,
			  behavior: 'smooth'
			})
		}
	}
	render() {

		const cities = this.state.cities
		const position = this.state.position

		var datePicker = null;

		if (this.state.datePicker.active) {

			datePicker = <DatePicker
			onClickSetDate={this.handleClickSetDate}
			onClickSetDay={this.handleClickSetDay}
			onClickSetMonth={this.handleClickSetMonth}
			onClickSetYear={this.handleClickSetYear}
			onClickToday={this.handleClickToday}
			dateTime={this.state.dateTime}
			/>

		}

		var cityPicker = null;

		if (this.state.cityPicker.active) {

			cityPicker = <CityPicker
							onClickAdd={this.handleClickAddCity}
							onClickClose={this.handleClickCloseCityPicker}
						/>

		}

		return (
			<div className="timezone-app">

				{datePicker}

				{cityPicker}

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
							onClickRemove={this.handleClickRemoveCity}
							update={!this.state.datePicker.active}
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
					onClick={this.handleClickOpenCityPicker}
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