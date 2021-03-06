'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import TodoItem from './todo-item.jsx';

var ENTER_KEY = 13,
	COMPLETED_CLASS_NAME = 'completed',
	UNCOMPLETED_CLASS_NAME = '';


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
					this.setState({items: this.state.items.concat({
						title: this.state.newTodo,
						isCompleted: false,
						className: UNCOMPLETED_CLASS_NAME
					})});
					this.state.newTodo = '';
				}
			}
		}
	}

	handlerOnChange(event){
		this.setState({newTodo: event.target.value});
	}

	compareItems = (item1, item2) =>{
		let titleOfItem1 = item1.title.toUpperCase();
		let titleOfItem2 = item2.title.toUpperCase();
		if(titleOfItem1 > titleOfItem2)
			return 1;
		if(titleOfItem1 < titleOfItem2)
			return -1;
		return 0;
	};
	
	showTodoItems(){
		return this.state.items.sort(this.compareItems).map((item,index) => {
			return <TodoItem
						Key={index}
						todo={item}
						changeItemCheckBox={this.changeItemCheckBox.bind(this)}
						deleteItem={this.deleteItem.bind(this)}>
			       </TodoItem>
		});
	}

	changeItemCheckBox(index){
		let item = this.state.items[index];
		let isAllCompleted;

		item.isCompleted = !item.isCompleted;
		item.className = item.isCompleted ? COMPLETED_CLASS_NAME : UNCOMPLETED_CLASS_NAME;

		if(this.state.items.every(item => item.isCompleted)){
			isAllCompleted = true;
		}

		this.setState({
			items: this.state.items,
			isAllCompleted: isAllCompleted});
	}

	changeToggleAllCheckbox(event){
		let isCompleted = event.target.checked;
		this.setState({
			items: this.state.items.map(item => {
				item.isCompleted = isCompleted;
				item.className = isCompleted ? COMPLETED_CLASS_NAME : UNCOMPLETED_CLASS_NAME;
				return item}),
			isAllCompleted: isCompleted
		})
	}

	deleteItem(index){
		this.state.items.splice(index,1);
		this.setState({
			items: this.state.items
		})
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
						   type="checkbox"
						   checked={this.state.isAllCompleted}
						   onChange={this.changeToggleAllCheckbox.bind(this)}/>
					<ul className="todo-list">
						{this.showTodoItems()}
					</ul>
				</section>
			</div>
		);
	}
}
