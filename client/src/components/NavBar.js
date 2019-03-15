import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity, faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {

	// constructor(props) {
	// 	super(props)

	// 	this.handleClickNav = this.handleClickNav.bind(this)
	// }

	render() {

		const items = this.props.items

		return (
	
				<div className="nav-bar">
					
					<div
					className="logo">
					<FontAwesomeIcon
					icon={faInfinity} 
					/>
					</div>

					{items.map((item, index) => (

						<Button 
						key={item.name}
						id={index}
						theme={BUTTON.THEME.TERTIARY}
						icon={item.icon}
						shape={BUTTON.SHAPE.CIRCLE}
						size={BUTTON.SIZE.SMALL}
						onClick={this.props.onClickNav}
						active={item.active}
						/>

						)
					)}

				</div>

			)
	}

}

export default NavBar
