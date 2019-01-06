import React, { Component } from 'react'

class TimezoneApp extends Component {

	render() {

		var rows = [];
		for (var i = 0; i < 24; i++) {
			rows.push(<li key={i}>{i}:00</li>);
		}

		return (
			<div className="city">
				<h3>{this.props.name}</h3>
				<ul>{rows}</ul>
			</div>
		)
	}
}

export default TimezoneApp