import React, { Component } from 'react'

class DatePicker extends Component {

	// constructor(props) {
	// 	super(props)
	// 	this.handleClickSetDate = this.handleClickSetDate.bind(this);
	// }
	// handleClickSetDate() {

	// }
	render() {
		return (
			<div className={this.props.active ? 'date-picker active' : 'date-picker'}>
				<h3>15 Jan 2019</h3>
				<SetDateButton
				onClick={this.props.onClickSetDate}
				/>
			</div>
			)
	}

}

class SetDateButton extends Component {

	render() {
		return (
			<button 
			className='btn'
			onClick={this.props.onClick}
			>
			Set Date
			</button>
		)
	}
}

export default DatePicker