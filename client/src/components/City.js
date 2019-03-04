import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
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
		this.handleClickStartDrag = this.handleClickStartDrag.bind(this)

		//CityInput Event Handlers
		// this.handleChangeCityInput = this.handleChangeCityInput.bind(this)
		// this.handleSuggestionsFetchRequestedCityInput = this.handleSuggestionsFetchRequestedCityInput.bind(this)
		// this.handleSuggestionsClearRequestedCityInput = this.handleSuggestionsClearRequestedCityInput.bind(this)
		// this.handleKeyPressCityInput = this.handleKeyPressCityInput.bind(this)
		// this.handleSuggestionSelectedCityInput = this.handleSuggestionSelectedCityInput.bind(this)

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

	handleClickStartDrag() {

		this.props.onClickStartDrag(
			{
			index: this.props.columnIndex,
			}
		)
	}


	shouldComponentUpdate(nextProps,nextState) {
		//console.log(nextProps.active)
		return nextProps.update
	}

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

			return null;
			
// 			// new city - render options

//     		const { value, suggestions } = this.state;

//     		//console.log();

//     		// check if CityInput value is a valid city name

// 			return(
// 				<div className={
// 					this.props.active ? 
// 					'city city-new active' : 
// 					'city city-new'
// 				}>
// 					<h3>Add City</h3>
// 					<CityInput
// 						value={value}
// 						index={this.props.columnIndex}
// 						suggestions={suggestions}
// 						onChange={this.handleChangeCityInput}
// 						onKeyPress={this.handleKeyPressCityInput}
// 						onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedCityInput}
// 						onSuggestionsClearRequested={this.handleSuggestionsClearRequestedCityInput}
// 						onSuggestionSelected={this.handleSuggestionSelectedCityInput}
// 					/>

// {/*
// 					// removing button (just adds confusion to the UX)

// 					{(this.isValidCityName(value)) ?
// 					<Button
// 						text="Add City"
// 						onClick={this.handleClickAdd}
// 					/>
// 					: false}
// */}

// 					<Button 
// 						theme="secondary"
// 						icon={faTimes}
// 						shape="circle"
// 						size="small"
// 						onClick={this.handleClickRemove}
// 					/>

// 				</div>
// 			)

		} else {

			// city - render content (time rows)

			const activeTimeRow = this.props.activeTimeRow
			const baseDateTime = this.props.dateTime
			
    		const timezone = tzlookup(this.props.lat, this.props.lon)

			let rows = [];

			for (let i = 0; i < 24; i++) {
				rows.push(
					<li key={i} >
						<TimeRow 
						rowIndex={i}
						// onMouseEnter={this.handleMouseEnterRow} //removing this, it doesnt do anything useful, and just adds unnessesary re-rendering
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

				<div
				className={"city"
				+(this.props.collapsed ? " collapsed" : "")
				}
				 >
					
					<CityHead 
							name={this.props.name} 
							country={this.props.country} 
							columnIndex={this.props.columnIndex} 
							active={ this.props.active }
							onClickRemove={this.handleClickRemove}
							onClickStartDrag={this.handleClickStartDrag}
					/>

					<ul>{rows}</ul>
				</div>
			)

		}
	}
}

class TimeRow extends Component {

	constructor(props) {

		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this)

	}

	handleMouseEnter() {
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(this.props.rowIndex)
		}
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
				<div className="label">

					<Moment
					className="label-time"
					add={{ hours: this.props.rowIndex }}
					format="h:mm a"
					tz={this.props.timezone}
					>
					{this.props.baseDateTime}
					</Moment>
					
					<Moment
					className="label-day"
					add={{ hours: this.props.rowIndex }}
					format="ddd - D MMM"
					tz={this.props.timezone}
					>
					{this.props.baseDateTime}
					</Moment>

				</div>

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
				
				<div className="head">

					<div>
						<FlagIcon 
						className="country-flag"
						code={country} 
						size="lg" 
						squared={false}
						/>
					</div>

					<h3
					className="city-name" 
					onClick={this.props.onClickStartDrag}
					>
						{this.props.name}
					</h3>

					<Button 
						theme={BUTTON.THEME.SECONDARY}
						icon={faTimes}
						shape={BUTTON.SHAPE.CIRCLE}
						size={BUTTON.SIZE.SMALL}
						onClick={this.handleClickRemove}
					/>

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

