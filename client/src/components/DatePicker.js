import React, { Component } from 'react'
import Button from './Button'
import Moment from 'react-moment';

class DatePicker extends Component {

	render() {
		return (
			<div className={this.props.active ? 'date-picker active' : 'date-picker'}>
				<h3>
				<Moment format="D MMM YYYY" >
				{this.props.dateTime}
				</Moment>
				</h3>
				<Button
				text="Set Date"
				onClick={this.props.onClickSetDate}
				/>
			</div>
			)
	}

}

export default DatePicker