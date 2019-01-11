import React, { Component } from 'react'

class City extends Component {

	constructor(props) {

		super(props);
		this.handleMouseEnterRow = this.handleMouseEnterRow.bind(this);

	}

	handleMouseEnterRow(rowIndex) {
		this.props.onMouseEnter({
			column: this.props.columnIndex, 
			row: rowIndex
		});
	}

	render() {

		var rows = [];
		for (var i = 0; i < 24; i++) {
			rows.push(
				<li key={i} >
					<TimeRow 
					rowIndex={i}
					onMouseEnter={this.handleMouseEnterRow}
					/>
				</li>
				);
		}

		return (
			<div className="city">
				<h3>{this.props.name}</h3>
				<ul>{rows}</ul>
			</div>
		)
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

		return(
			<div 
			className="row-time" 
			onMouseEnter={this.handleMouseEnter}
			>
				<span className="label-day">Wed</span>
				<span className="label-time">{this.props.rowIndex}:00</span>
			</div>
			)
	}
}

export default City