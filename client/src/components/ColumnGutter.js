import React, { Component } from 'react'
// import Button from './Button'
// import { faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons'


class ColumnGutter extends Component {

	// constructor(props) {
	// 	super(props)
	// }


	render() {

		console.log(this.props.active);

		return (
			<div 
			className={"column-gutter"
			+(this.props.collapsed ? " collapsed" : "")
			}
			>
			</div>
			)
	}

}

export default ColumnGutter

