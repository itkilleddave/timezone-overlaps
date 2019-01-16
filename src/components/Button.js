import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BUTTON = {
	THEME : {
		PRIMARY : 'primary',
		SECONDARY : 'secondary'
	},
	SHAPE : {
		DEFAULT : 'default',
		CIRCLE : 'circle'
	}
}

class Button extends Component {

	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.props.onClick()
	}

	render() {

		return (
			<button
			className={"btn"
			+" btn-"+(this.props.theme ? this.props.theme : BUTTON.THEME.PRIMARY)
			+" btn-"+(this.props.shape ? this.props.shape : BUTTON.SHAPE.DEFAULT)
			}
			onClick={this.handleClick}
			>
			{this.props.icon ? <FontAwesomeIcon icon={this.props.icon} /> : ''} 
			{this.props.text}
			</button>
		)
		
	}
}

export default Button

export {BUTTON}

// class ChangeDateButton extends Component {

// 	constructor(props) {
// 		super(props)
// 		this.handleClick = this.handleClick.bind(this)
// 	}

// 	handleClick() {
// 		this.props.onClick()
// 	}

// 	render() {

// 		return (
// 		<button 
// 		className="btn btn-circle btn-bottom-left"
// 		onClick={this.handleClick}
// 		>
// 			<FontAwesomeIcon icon={faCalendar} />
// 		</button>
// 		)
		
// 	}
// }