import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


class DatePicker extends Component {

	// constructor(props) {
	// 	super(props)
	// 	this.handleClickSetMonth = this.handleClickSetMonth.bind(this)
	// }

	daysInCurrentMonth() {

		const month = this.props.dateTime.getMonth()+1
		const year = this.props.dateTime.getYear()+1900

	    return new Date(year, month, 0).getDate();
	}

	render() {

		var months = []

		for (var i = 0; i < 12; i++) {
			
			months.push(moment(i+1, 'M').format('MMM'))
		}

		const currentMonth = this.props.dateTime.getMonth()

		const currentDay = this.props.dateTime.getDate()

		//console.log(currentDay)

		return (
			<div className={this.props.active ? 'date-picker active' : 'date-picker'}>
				
				<div className="label-day-month">
					<Moment format="D MMM">
					{this.props.dateTime}
					</Moment>
				</div>

				<div className="label-year">
					<Button
					icon={faMinus}
					shape={BUTTON.SHAPE.CIRCLE}
					size={BUTTON.SIZE.SMALL}
					theme={BUTTON.THEME.SECONDARY}
					/>
{/*
					<Moment format="YYYY">
					{this.props.dateTime}
					</Moment>
*/}
					<span>2019</span>

					<Button
					icon={faPlus}
					shape={BUTTON.SHAPE.CIRCLE}
					size={BUTTON.SIZE.SMALL}
					theme={BUTTON.THEME.SECONDARY}
					/>
				</div>

				<div className="month-buttons">
				    
				    <div className="day-slider">
				    	<span>1</span>
					    <Slider 
		      			min={1}
		      			max={this.daysInCurrentMonth()} 
		      			value={currentDay} 
						onChange={this.props.onClickSetDay}
		      			/>
				    	<span>{this.daysInCurrentMonth()}</span>
	      			</div>

					{months.map((month, index) => (
						<Button
						key={month}
						text={month}
						active={(currentMonth === index) ? true : false}
						onClick={() => this.props.onClickSetMonth(index)}
						theme="secondary"
						/>
					))}
				</div>

				<div className="action-buttons">
					<Button
					text="Set Date"
					onClick={this.props.onClickSetDate}
					/>
				</div>

			</div>
			)
	}

}

export default DatePicker