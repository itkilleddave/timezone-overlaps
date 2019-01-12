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

		//console.log('position', this.props.activeTimeRow); 

		const activeTimeRow = this.props.activeTimeRow

		var rows = [];
		for (var i = 0; i < 24; i++) {
			rows.push(
				<li key={i} >
					<TimeRow 
					rowIndex={i}
					onMouseEnter={this.handleMouseEnterRow}
					active={ (i===activeTimeRow) ? true : false }
					/>
				</li>
				);
		}

		return (
			<div className={this.props.active ? 'city active' : 'city'}>
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

		//console.log('active', this.props.active); 

		return(
			<div 
			className={this.props.active ? 'row-time active' : 'row-time'} 
			onMouseEnter={this.handleMouseEnter}
			>
				<div className="label label-day">Wed</div>
				<div className="label label-time">{this.props.rowIndex}:00</div>
			</div>
			)
	}
}

export default City