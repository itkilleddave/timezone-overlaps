import React, { Component } from 'react'
import Button from './Button'
import CityInput from './CityInput'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import FlagIcon from './FlagIcon'
import tzlookup from 'tz-lookup'
import Moment from 'react-moment';
import 'moment-timezone';


class CityPicker extends Component {

	constructor(props) {

		super(props);

		// state used for the suggestive input (CityInput)

	    this.state = {
	      	value: '',
	      	suggestions: [],
      		isLoading: false,
	    };

		//this.handleClickRemove = this.handleClickRemove.bind(this)

		//CityInput Event Handlers
		this.handleChangeCityInput = this.handleChangeCityInput.bind(this)
		this.handleSuggestionsFetchRequestedCityInput = this.handleSuggestionsFetchRequestedCityInput.bind(this)
		this.handleSuggestionsClearRequestedCityInput = this.handleSuggestionsClearRequestedCityInput.bind(this)
		this.handleKeyPressCityInput = this.handleKeyPressCityInput.bind(this)
		this.handleSuggestionSelectedCityInput = this.handleSuggestionSelectedCityInput.bind(this)

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

	render() {

    	const { value, suggestions } = this.state;

		return (
			<div className="container-full-screen city-picker">
					
					<h3>Add City</h3>
					<CityInput
						value={value}
						suggestions={suggestions}
						onChange={this.handleChangeCityInput}
						onKeyPress={this.handleKeyPressCityInput}
						onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedCityInput}
						onSuggestionsClearRequested={this.handleSuggestionsClearRequestedCityInput}
						onSuggestionSelected={this.handleSuggestionSelectedCityInput}
					/>

			</div>
			)
	}

}

export default CityPicker