import React, { Component } from 'react'
import City from './City'
import DatePicker from './DatePicker'
import CityPicker from './CityPicker'
import ColumnGutter from './ColumnGutter'
import Button, { BUTTON } from './Button'
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'

// function getEmptyCity() {
// 	return {
// 				name: "",
// 				country: "",
// 				//countryCode: "",
// 				//timezone: "",
// 			}
// }

class TimezoneApp extends Component {

	constructor(props) {
		super(props);

		const dateTime = new Date()
		dateTime.setHours(0,0,0,0)

		this.state = {
			cities : [],
			position : [],
			dateTime : dateTime,
			datePicker : {
				active : false
			},
			cityPicker : {
				active : false,
				insertAtIndex : -1,
			},
			isDraggingCityIndex : -1,
			isExpandedColumnGutterIndex : -1,
		}

		// datePicker handlers
		this.handleClickChangeDate = this.handleClickChangeDate.bind(this)
		this.handleClickSetDate = this.handleClickSetDate.bind(this)
		this.handleClickSetDay = this.handleClickSetDay.bind(this)
		this.handleClickSetMonth = this.handleClickSetMonth.bind(this)
		this.handleClickSetYear = this.handleClickSetYear.bind(this)
		this.handleClickToday = this.handleClickToday.bind(this)

		//cityPicker handlers
		this.handleClickCloseCityPicker = this.handleClickCloseCityPicker.bind(this)
		this.handleClickOpenCityPicker = this.handleClickOpenCityPicker.bind(this)
		this.handleClickAddCity = this.handleClickAddCity.bind(this)

		//city handlers
		this.handleClickRemoveCity = this.handleClickRemoveCity.bind(this)
		this.handleClickStartDragCity = this.handleClickStartDragCity.bind(this)
		this.handleMouseEnterCityTimeRow = this.handleMouseEnterCityTimeRow.bind(this)

		//columnGutter handlers
		this.handleClickExpandColumnGutter = this.handleClickExpandColumnGutter.bind(this)
		this.handleClickSwapCity = this.handleClickSwapCity.bind(this)
		this.handleClickInsertCity = this.handleClickInsertCity.bind(this)

	}

	/* date picker functions */

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

	// city picker functions

	handleClickOpenCityPicker() {
		
		const cp = {...this.state.cityPicker, active:true}

		this.setState({cityPicker: cp})

	}
	handleClickCloseCityPicker() {
		
		const cp = {...this.state.cityPicker, active:false}

		this.setState({cityPicker: cp})
	}
	handleClickAddCity(cityData) {

		//console.log('cityData', cityData);

		const i = this.state.cityPicker.insertAtIndex;

		let c = this.state.cities.concat()

		if (i === -1) {
			c.push(cityData.props)
		} else {
			c.splice(i, 0, cityData.props)
		}

		const cities = c.concat()

		// const cities = (i === -1)
		// ? c.concat(cityData.props) // add to end
		// : c.splice(i, 0, cityData.props) // insert at index

		const cp = {...this.state.cityPicker, 
			active:false, 
			insertAtIndex : -1
		}
		
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
	handleClickStartDragCity(cityData) {

		//console.log('startDrag', cityData)

		this.setState({isDraggingCityIndex: cityData.index})
		
	}
	handleMouseEnterCityTimeRow(position) {
		this.setState({
			position : position
		})
	}

	// standard react events

	stabliliseFragileState() {

		// if there are no cities, we auto prompt the city picker

		if (!this.state.cities.length
			&& this.state.cityPicker.active === false
			) {

			const cityPicker = {
				active : true,
				insertAtIndex : 0,
			}

			this.setState({cityPicker : cityPicker})

		}
	}

	componentWillMount() {

		// for testing

		if (this.props.testCityData) {

			this.setState({cities: this.props.testCityData})

		}
	}

	componentDidMount() {

		this.stabliliseFragileState()

	}
	componentDidUpdate(prevProps, prevState, snapshot) {

		console.log(this.state.cities.length)

		this.stabliliseFragileState()

		if(this.state.cities.length > prevState.cities.length) {

			window.scrollTo({
			  //top: 0,
			  left: document.body.scrollWidth,
			  behavior: 'smooth'
			})
		}

	}

	/* column gutter functions */

	newColumnGutter(index) {

		const expandedCol = this.state.isExpandedColumnGutterIndex;
		const dragging = this.state.isDraggingCityIndex;

		return (
			<ColumnGutter 
			key={'column-gutter-'+index} 
			index={index}
			collapsed={(
				dragging !== -1
				||
				expandedCol !== -1
				) ? false : true}
			onClickExpand={this.handleClickExpandColumnGutter}
			onClickAdd={this.handleClickInsertCity}
			onClickSwap={this.handleClickSwapCity}
			className={this.state.cities.length === 1 ? "empty" : ""}
			/>
		)
	}
	handleClickExpandColumnGutter(cgData) {
		
		console.log(cgData)

		if (this.state.isExpandedColumnGutterIndex !== -1) {

			this.setState({
				isExpandedColumnGutterIndex : -1
			})

		} else {

			this.setState({
				isExpandedColumnGutterIndex : cgData.index
			})

		}
		
	}
	handleClickInsertCity(cgData) {
		
		//console.log('cgData', cgData);

		const cp = {...this.state.cityPicker, 
			active : true, 
			insertAtIndex : cgData.index
		}

		this.setState({cityPicker: cp})
		
	}
	handleClickSwapCity(cgData) {
		
		const i = (cgData.index)

		let cities = this.state.cities.concat()

		const temp = cities[i]
		cities[i] = cities[i-1]
		cities[i-1] = temp


		this.setState({
			cities: cities.concat(),
		})
		
	}

	render() {

		const dragging = this.state.isDraggingCityIndex;
		const expandedCol = this.state.isExpandedColumnGutterIndex;
		const cities = this.state.cities
		const position = this.state.position

		let datePicker = null;

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

		let cityPicker = null;

		if (this.state.cityPicker.active) {

			cityPicker = <CityPicker
							onClickAdd={this.handleClickAddCity}
							onClickClose={this.handleClickCloseCityPicker}
						/>

		}

		console.log('cc', cities)

		const columns = cities.map((city, index) => (
			<div 
			className={'item '+(!city.name ? 'new' : 'set')} 
			key={'city-'+index}>
				<City 
				name={city.name} 
				country={city.country} 
				lat={city.lat}
				lon={city.lon}
				dateTime={this.state.dateTime}
				columnIndex={index}
				onMouseEnter={this.handleMouseEnterCityTimeRow}
				active={ (index===position.column) ? true : false }
				activeTimeRow={position.row}
				onClickRemove={this.handleClickRemoveCity}
				onClickStartDrag={this.handleClickStartDragCity}
				update={!this.state.datePicker.active}
				collapsed={(
					dragging !== -1
					||
					expandedCol !== -1
					) ? true : false}
				/>
			</div>
			)
		)

		let arr = []

		const columnGutters = cities.map((city, index) => (
			this.newColumnGutter(index)
		))

		// weave the 2 arrays

		for (let i = 0; i < cities.length; i++) {
			arr = arr.concat(columnGutters[i])
			arr = arr.concat(columns[i])
		}

		// add extra end columnGutter on end

		arr.push(this.newColumnGutter(cities.length))

		const content = arr.concat();



		return (
			<div className="timezone-app">

				{datePicker}

				{cityPicker}

				<div className="container container-content">
					{content}
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
					onClick={this.handleClickOpenCityPicker}
					pulse={
						(!cities.length)
						||
						(cities.length===1 && cities[0].name !== '')
						? true : false}
					//pulse={ cities.length ? true : false} 
					/>
				</div>
			</div>

		)

		
	}
}


export default TimezoneApp