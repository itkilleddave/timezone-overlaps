import React, { Component } from 'react'
import Button from './Button'
import Moment from 'react-moment';

class DatePicker extends Component {

	// constructor(props) {
	// 	super(props)
	// 	this.handleClickSetMonth = this.handleClickSetMonth.bind(this)
	// }

	render() {

		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		]

		return (
			<div className={this.props.active ? 'date-picker active' : 'date-picker'}>
				
				<h3>
				<Moment format="D MMM YYYY">
				{this.props.dateTime}
				</Moment>
				</h3>

				<div className="month-buttons">
					{months.map((month, index) => (
						<Button
						key={month}
						text={month}
						value={month}
						onClick={() => this.props.onClickSetMonth(month)}
						theme="secondary"
						/>
					))}
				</div>

				<Button
				text="Set Date"
				onClick={this.props.onClickSetDate}
				/>

			</div>
			)
	}

}

export default DatePicker