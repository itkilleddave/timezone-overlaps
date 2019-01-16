import React, { Component } from 'react'
import Button from './Button'

class DatePicker extends Component {

	render() {
		return (
			<div className={this.props.active ? 'date-picker active' : 'date-picker'}>
				<h3>15 Jan 2019</h3>
				<Button
				text="Set Date"
				onClick={this.props.onClickSetDate}
				/>
			</div>
			)
	}

}

export default DatePicker