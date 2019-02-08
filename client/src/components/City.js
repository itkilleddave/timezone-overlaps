import React, { Component } from 'react'
import Button from './Button'
import CityInput from './CityInput'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import FlagIcon from './FlagIcon'
import tzlookup from 'tz-lookup'
import Moment from 'react-moment';
import 'moment-timezone';

class City extends Component {

	constructor(props) {

		super(props);

		// state used for the suggestive input (CityInput)

	    this.state = {
	      	value: '',
	      	suggestions: [],
      		isLoading: false,
	    };

    	//this.lastRequestId = null;

		this.handleMouseEnterRow = this.handleMouseEnterRow.bind(this)
		this.handleClickRemove = this.handleClickRemove.bind(this)

		//CityInput Event Handlers
		this.handleChangeCityInput = this.handleChangeCityInput.bind(this)
		this.handleSuggestionsFetchRequestedCityInput = this.handleSuggestionsFetchRequestedCityInput.bind(this)
		this.handleSuggestionsClearRequestedCityInput = this.handleSuggestionsClearRequestedCityInput.bind(this)
		this.handleKeyPressCityInput = this.handleKeyPressCityInput.bind(this)
		this.handleSuggestionSelectedCityInput = this.handleSuggestionSelectedCityInput.bind(this)

	}

	handleMouseEnterRow(rowIndex) {
		this.props.onMouseEnter({
			column: this.props.columnIndex, 
			row: rowIndex
		});
	}

	handleClickRemove() {

		this.props.onClickRemove(
			{
			index: this.props.columnIndex,
			}
		)
	}

	// CityInput Event Handlers

	handleChangeCityInput(newValue) {
		this.setState({
		  value: newValue
		});
	};

	callApiFilteredCities = async (value) => {

		const response = await fetch('/api/filtered-cities', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({ value: value })
	    });

		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	loadSuggestionsCityInput(value) {

	    this.setState({
	      isLoading: true
	    });
	    
        this.callApiFilteredCities(value)
		.then(res => this.setState({
	      	isLoading: false,
		  	suggestions: res,
		}))
		.catch(err => console.log(err));

	}



	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	handleSuggestionsFetchRequestedCityInput(value) {
		//console.log(value);
		this.loadSuggestionsCityInput(value);
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	handleSuggestionsClearRequestedCityInput() {
		this.setState({
		  suggestions: []
		});
	};

	handleKeyPressCityInput(event) {

		// const value = this.state.value

		// if (event.key === 'Enter')
		// {
		// 	if (this.isValidCityName(value))
		// 	{
		// 	this.handleClickAdd()
		// 	}
		// }

	}
	handleSuggestionSelectedCityInput(suggestion) {

		//console.log(suggestion)

		this.setState({
		  value: suggestion.name
		});

		this.props.onClickAdd(
			{
			index: this.props.columnIndex,
			props: suggestion
			//props: cities[this.getCityIndexByName(suggestion.name)],
			}
		)
	}

	// data functions

	// getCityIndexByName(value) {

	// 	for(var i = 0; i < cities.length; i++) {
	// 	    if (cities[i].name === value) {
	// 	        return i
	// 	    }
	// 	}

	// 	return -1;
	// }

	// isValidCityName(name) {
	// 	return this.getCityIndexByName(name)>=0 ? true : false
	// }

	componentDidUpdate(prevProps, prevState, snapshot) {

		// if (this.props.lat) {
		// 	if(
		// 		prevProps.lat !== this.props.lat
		// 		||
		// 		prevProps.lon !== this.props.lon
		// 		) {

		// 		alert("Get City Timezone: "+tzlookup(this.props.lat, this.props.lon))
		// 	}
		// }
			
	}

	render() {

		//console.log('position', this.props.activeTimeRow); 

		if (!this.props.name) {

			// new city - render options

    		const { value, suggestions } = this.state;

    		//console.log();

    		// check if CityInput value is a valid city name

			return(
				<div className={
					this.props.active ? 
					'city city-new active' : 
					'city city-new'
				}>
					<h3>Add City</h3>
					<CityInput
						value={value}
						index={this.props.columnIndex}
						suggestions={suggestions}
						onChange={this.handleChangeCityInput}
						onKeyPress={this.handleKeyPressCityInput}
						onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedCityInput}
						onSuggestionsClearRequested={this.handleSuggestionsClearRequestedCityInput}
						onSuggestionSelected={this.handleSuggestionSelectedCityInput}
					/>

{/*
					// removing button (just adds confusion to the UX)

					{(this.isValidCityName(value)) ?
					<Button
						text="Add City"
						onClick={this.handleClickAdd}
					/>
					: false}
*/}

					<Button 
						theme="secondary"
						icon={faTimes}
						shape="circle"
						size="small"
						onClick={this.handleClickRemove}
					/>

				</div>
			)

		} else {

			// city - render content (time rows)

			const activeTimeRow = this.props.activeTimeRow

			const baseDateTime = new Date()//'1976-04-19T12:59-0500';
			
    		const timezone = tzlookup(this.props.lat, this.props.lon)

			var rows = [];
			for (var i = 0; i < 24; i++) {
				rows.push(
					<li key={i} >
						<TimeRow 
						rowIndex={i}
						onMouseEnter={this.handleMouseEnterRow}
						beforeActive={ (i===activeTimeRow-1) ? true : false }
						active={ (i===activeTimeRow) ? true : false }
						afterActive={ (i===activeTimeRow+1) ? true : false }
						baseDateTime={baseDateTime}
						timezone={timezone}
						/>
					</li>
					)
			}


			return (

				<div className={this.props.active ? 'city active' : 'city'}>
					<ul>{rows}</ul>
				</div>
			)

		}
	}
}

class TimeRow extends Component {

	constructor(props) {

		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);

	}

	handleMouseEnter() {
		this.props.onMouseEnter(this.props.rowIndex);
	}

	render() {

		// console.log('active', this.props.active); 

		// console.log(this.props.timezone);

		let className = 'row-time ';

        className += this.props.beforeActive ? 'before-active ' : ''
        className += this.props.active ? 'active ' : ''
        className += this.props.afterActive ? 'after-active ' : ''


		return(
			<div 
			className={className} 
			onMouseEnter={this.handleMouseEnter}
			>
				{/*
				find formats here: http://momentjs.com/
				*/}

				<Moment
				className="label label-day"
				add={{ hours: this.props.rowIndex }}
				format="dddd"
				tz={this.props.timezone}
				>
				{this.props.baseDateTime}
				</Moment>

				<Moment
				className="label label-time"
				add={{ hours: this.props.rowIndex }}
				format="h:mm a"
				tz={this.props.timezone}
				>
				{this.props.baseDateTime}
				</Moment>



			</div>
			)
	}
}

class CityHead extends Component {


	constructor(props) {

		super(props);

		this.handleClickRemove = this.handleClickRemove.bind(this)

	}

	handleClickRemove() {

		this.props.onClickRemove(
			{
			index: this.props.columnIndex,
			}
		)
	}

	render() {

		//console.log('city', this.props)

		const country = this.props.country.toLowerCase();

		if(this.props.name) {
		return (
			<div className={this.props.active ? 'city active' : 'city'}>
				
				<div className="head">

					<div>
						<FlagIcon 
						className="country-flag"
						code={country} 
						size="lg" 
						squared={false}
						/>
					</div>

					<h3 className="city-name">
						{this.props.name}
					</h3>

					<Button 
						theme="secondary"
						icon={faTimes}
						shape="circle"
						size="small"
						onClick={this.handleClickRemove}
					/>

	{/*				<h3 className="city-name">
						{this.props.name}
					</h3>*/}

				</div>

			</div>
			)
		} else {
			return (
			<div className={this.props.active ? 'city active' : 'city'}>
			</div>
			)
		}
	}

}

export default City

export { CityHead }

