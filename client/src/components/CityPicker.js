import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
import CityInput from './CityInput'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
		this.handleKeyDownCityInput = this.handleKeyDownCityInput.bind(this)
		this.handleKeyUpCityInput = this.handleKeyUpCityInput.bind(this)
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

	handleKeyDownCityInput(event) {

		// const value = this.state.value

		// if (event.key === 'Enter')
		// {
		// 	if (this.isValidCityName(value))
		// 	{
		// 	this.handleClickAdd()
		// 	}
		// }

	}
	handleKeyUpCityInput(event) {

		//console.log('event', event.keyCode)

		// if (event.keyCode === 40 || event.keyCode === 38) 
		// {
		// 	// down arrow

		// 	//console.log('aaa')

		// 	const highlightedSuggestionIndex = this.findWithAttr(this.state.suggestions, 'name', this.state.value)

		// 	if (highlightedSuggestionIndex >= 0) {
				
		// 		console.log('highlightedSuggestionIndex', highlightedSuggestionIndex)
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

	findWithAttr(array, attr, value) {
	    for(let i = 0; i < array.length; i += 1) {
	        if(array[i][attr] === value) {
	            return i;
	        }
	    }
	    return -1;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		// if (prevState.value !== this.state.value) {

		// 	const highlightedSuggestionIndex = this.findWithAttr(this.state.suggestions, 'name', this.state.value)

		// 	if (highlightedSuggestionIndex >= 0) {
				
		// 		console.log('name', highlightedSuggestionIndex)
		// 	}

		// }

		// if(this.state.cities.length > prevState.cities.length) {

		// 	window.scrollTo({
		// 	  //top: 0,
		// 	  left: document.body.scrollWidth,
		// 	  behavior: 'smooth'
		// 	})
		// }
	}

	render() {



    	const { value, suggestions } = this.state;

		return (
			<div
			className={"container-full-screen city-picker"
			+" character-count-"+value.length
			}
			>
					
					<CityInput
						value={value}
						suggestions={suggestions}
						onChange={this.handleChangeCityInput}
						//onKeyDown={this.handleKeyDownCityInput}
						//onKeyUp={this.handleKeyUpCityInput}
						onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedCityInput}
						onSuggestionsClearRequested={this.handleSuggestionsClearRequestedCityInput}
						onSuggestionSelected={this.handleSuggestionSelectedCityInput}
						isLoading={this.state.isLoading}
					/>

					<div className="btn-bottom-right">
						<Button 
						theme={BUTTON.THEME.PRIMARY}
						icon={faTimes}
						shape={BUTTON.SHAPE.CIRCLE}
						onClick={this.props.onClickClose}
						/>
					</div>

			</div>
			)
	}

}

export default CityPicker