import React, { Component } from 'react'
import Button from './Button'
import Moment from 'react-moment';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class DatePicker extends Component {

	// constructor(props) {
	// 	super(props)
	// 	this.handleClickSetMonth = this.handleClickSetMonth.bind(this)
	// }

	render() {

		var months = []

		for (var i = 0; i < 12; i++) {
			
			months.push(moment(i+1, 'M').format('MMM'))
		}

		const currentMonth = this.props.dateTime.getMonth()

		return (
			<div className={this.props.active ? 'date-picker active' : 'date-picker'}>
				
				<h3>
				<Moment format="D MMM YYYY">
				{this.props.dateTime}
				</Moment>
				</h3>



				<div className="month-buttons">
				    
				    <Slider 
	      			className="day-slider"
	      			min={0} 
	      			max={31} 
	      			defaultValue={15} 
	      			/>

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