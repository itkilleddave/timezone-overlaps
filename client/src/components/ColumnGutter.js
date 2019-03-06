import React, { Component } from 'react'
import Button, { BUTTON } from './Button'
import { faEllipsisV, faPlus, faArrowsAltH } from '@fortawesome/free-solid-svg-icons'


class ColumnGutter extends Component {

	constructor(props) {

		super(props)
       	this.state = {
            buttonClass: 'scale-up'
        };
		this.handleClickExpand = this.handleClickExpand.bind(this)
		this.handleClickAdd = this.handleClickAdd.bind(this)
		this.handleClickSwap = this.handleClickSwap.bind(this)
	}
	handleClickExpand() {

		this.props.onClickExpand(
			{
			index: this.props.index,
			}
		)
	}
	handleClickAdd() {

		this.props.onClickAdd(
			{
			index: this.props.index,
			}
		)
	}
	handleClickSwap() {

		this.props.onClickSwap(
			{
			index: this.props.index,
			}
		)
	}
	componentDidMount() {
        this.setState({ buttonClass: '' });
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
					onClick={this.handleClickAdd}
					className={"add "+this.state.buttonClass}
				/>
				<Button 
					theme={BUTTON.THEME.SECONDARY}
					icon={faArrowsAltH}
					shape={BUTTON.SHAPE.CIRCLE}
					size={BUTTON.SIZE.SMALL}
					onClick={this.handleClickSwap}
					className={"swap "+this.state.buttonClass}
				/>
			</div>
			)

		return (
			<div 
			className={"column-gutter"
			+(this.props.collapsed ? " collapsed" : "")
			+" "+this.props.className
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

