import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
import { faEllipsisV, faPlus, faArrowsAltH } from '@fortawesome/free-solid-svg-icons'


class ColumnGutter extends Component {

	constructor(props) {

		super(props)

		this.handleClickExpand = this.handleClickExpand.bind(this)
	}

	handleClickExpand() {

		this.props.onClickExpand(
			{
			index: this.props.index,
			}
		)
	}

	render() {



		const options =  (
			this.props.collapsed
			?
			null
			:
			<div className="options">
				<Button 
					theme={BUTTON.THEME.SECONDARY}
					icon={faPlus}
					shape={BUTTON.SHAPE.CIRCLE}
					size={BUTTON.SIZE.SMALL}
					onClick={this.handleClickRemove}
					transIn="scale-up"
				/>
				<Button 
					theme={BUTTON.THEME.SECONDARY}
					icon={faArrowsAltH}
					shape={BUTTON.SHAPE.CIRCLE}
					size={BUTTON.SIZE.SMALL}
					onClick={this.handleClickRemove}
					transIn="scale-up"
				/>
			</div>
			)

		return (
			<div 
			className={"column-gutter"
			+(this.props.collapsed ? " collapsed" : "")
			}
			>
				<div className="inner">

					<div className="head">
						<Button
							icon={faEllipsisV}
							shape={BUTTON.SHAPE.SQUARE}
							onClick={this.handleClickExpand}
						/>
					</div>

					{options}

				</div>

			</div>
			)
	}

}

export default ColumnGutter

