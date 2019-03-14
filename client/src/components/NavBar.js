import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity, faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {

	render() {

		return (
/*
				<ul className="nav-bar">
					<li className="logo">
						LOGO
					</li>
					<li>Currency</li>
					<li>Time</li>
				</ul>
*/
				<div className="nav-bar">
					
					<div
					className="logo">
					<FontAwesomeIcon
					icon={faInfinity} 
					/>
					</div>

					<Button 
						theme={BUTTON.THEME.TERTIARY}
						icon={faDollarSign}
						shape={BUTTON.SHAPE.CIRCLE}
						size={BUTTON.SIZE.SMALL}
					/>
					<Button 
						theme={BUTTON.THEME.TERTIARY}
						icon={faClock}
						shape={BUTTON.SHAPE.CIRCLE}
						size={BUTTON.SIZE.SMALL}
					/>

				</div>

			)
	}

}

export default NavBar
