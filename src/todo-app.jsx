'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TodoItem from './todo-item.jsx';

var ENTER_KEY = 13;

export default class TodoApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newTodo: null,
			items: []
		};
	}

	handlerKeyDown(event){
		if(event!==undefined) {
			if (event.keyCode === ENTER_KEY) {
				if (this.state.newTodo.trim() !== '') {
					this.setState({items: this.state.items.concat({title: this.state.newTodo})});
					this.state.newTodo = '';
				}
			}
		}
	}

	handlerOnChange(event){
		this.setState({newTodo: event.target.value});
	}
	
	showTodoItems(){
		return this.state.items.map(item => {
			return <TodoItem todo={item}></TodoItem>
		});
	}

	render() {
		return (
			<div>
				<header className="header">
					<h1>TodoApp</h1>
					<input className="new-todo"
						   placeholder="What needs to be done?"
						   autoFocus={true}
						   onKeyDown={this.handlerKeyDown.bind(this)}
						   onChange={this.handlerOnChange.bind(this)}
						   value={this.state.newTodo}
					/>
				</header>
				<section className="main">
					<input className="toggle-all"
						   type="checkbox" />
					<ul className="todo-list">
						{this.showTodoItems()}
					</ul>
				</section>
			</div>
		);
	}
}
