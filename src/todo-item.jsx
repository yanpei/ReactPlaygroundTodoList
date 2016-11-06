'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
	}

	handelerChange(){
		this.props.changeItemCheckBox(this.props.Key);
	}

	render() {
		return (
			<li className={this.props.todo.className}>
				<div className="view">
					<input className="toggle" checked={this.props.todo.isCompleted} onChange={this.handelerChange.bind(this)} type="checkbox" />
					<label>{this.props.todo.title}</label>
					<button className="destroy" />
				</div>
			</li>
		);
	}
}