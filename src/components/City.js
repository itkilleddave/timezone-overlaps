import React, { Component } from 'react'
import Button from './Button'
import CityInput from './CityInput'
import cities from '../Data'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class City extends Component {

	constructor(props) {

		super(props);

		// state used for the suggestive input (CityInput)

	    this.state = {
	      value: '',
	      suggestions: []
	    };

		this.handleMouseEnterRow = this.handleMouseEnterRow.bind(this)
		this.handleClickAdd = this.handleClickAdd.bind(this)
		this.handleClickRemove = this.handleClickRemove.bind(this)

		//CitInput Event Handlers
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

	handleClickAdd() {

		// validation note: the 'add city' button is available only when the value is valid, so no need to check validity here

		const cityName = this.state.value

		const cityDataIndex = this.getCityIndexByName(cityName)

		this.props.onClickAdd(
			{
			index: this.props.columnIndex,
			props: cities[cityDataIndex],
			}
		)
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

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	handleSuggestionsFetchRequestedCityInput(value) {
		this.setState({
		  suggestions: value
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	handleSuggestionsClearRequestedCityInput() {
		this.setState({
		  suggestions: []
		});
	};

	handleKeyPressCityInput(event) {

		const value = this.state.value

		if (event.key === 'Enter')
		{
			if (this.isValidCityName(value))
			{
			this.handleClickAdd()
			}
		}

		console.log(event.key);

		if (event.which === 9)
		{
       		event.preventDefault()
			console.log('dfsd')
		}
	}
	handleSuggestionSelectedCityInput(suggestion) {

		//console.log(suggestion)

		this.setState({
		  value: suggestion.name
		});

		this.props.onClickAdd(
			{
			index: this.props.columnIndex,
			props: cities[this.getCityIndexByName(suggestion.name)],
			}
		)
	}

	// data functions

	getCityIndexByName(value) {

		for(var i = 0; i < cities.length; i++) {
		    if (cities[i].name === value) {
		        return i
		        break
		    }
		}

		return -1;
	}

	isValidCityName(name) {
		return this.getCityIndexByName(name)>=0 ? true : false
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

		//console.log('active', this.props.active); 

		let className = 'row-time ';

        className += this.props.beforeActive ? 'before-active ' : ''
        className += this.props.active ? 'active ' : ''
        className += this.props.afterActive ? 'after-active ' : ''

		return(
			<div 
			className={className} 
			onMouseEnter={this.handleMouseEnter}
			>
				<div className="label label-day">Wed</div>
				<div className="label label-time">{this.props.rowIndex}:00</div>
			</div>
			)
	}
}

class CityHead extends Component {

	render() {
		return (
			<div className={this.props.active ? 'city active' : 'city'}>
				<h3>{this.props.name}</h3>
			</div>
			)
	}

}

export default City

export { CityHead }

