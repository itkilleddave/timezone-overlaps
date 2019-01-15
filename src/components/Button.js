import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BUTTON_SHAPE = {
	DEFAULT : 'default',
	CIRCLE : 'circle'
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
			className={"btn btn-"+(this.props.shape ? this.props.shape : BUTTON_SHAPE.DEFAULT)}
			onClick={this.handleClick}
			>
				<FontAwesomeIcon icon={this.props.icon} />
				{this.props.text}
			</button>
		)
		
	}
}

export default Button

export {BUTTON_SHAPE}

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