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
	

	}

	handleMouseEnterRow(rowIndex) {
		this.props.onMouseEnter({
			column: this.props.columnIndex, 
			row: rowIndex
		});
	}

	handleClickAdd() {

		// temp hardcoded data (will ultimately be derived from user input)

		this.props.onClickAdd(
			{
			index: this.props.columnIndex,
			props: {
					name: "London",
					country: "United Kingdom",
					countryCode: "GB",
					timezone: "Europe/London",
					}
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

	handleChangeCityInput() {
		console.log("change");
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



	render() {

		//console.log('position', this.props.activeTimeRow); 

		if (!this.props.name) {

			// new city - render options

    		const { value, suggestions } = this.state;

    		//console.log();

			return(
				<div className={
					this.props.active ? 
					'city city-new active' : 
					'city city-new'
				}>
					
					<CityInput
						value={value}
						suggestions={suggestions}
						onChangeCityInput={this.handleChangeCityInput}
						onSuggestionsFetchRequestedCityInput={this.handleSuggestionsFetchRequestedCityInput}
						onSuggestionsClearRequestedCityInput={this.handleSuggestionsClearRequestedCityInput}
					// onChange={this.handleChangeCityInput} 
					/>

					{value ?
					<Button
						text="Add City"
						onClick={this.handleClickAdd}
					/>
					: false}

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

