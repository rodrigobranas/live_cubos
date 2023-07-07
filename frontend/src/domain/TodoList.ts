import Todo from "./Todo";

export default class TodoList {
	todos: Todo[];

	constructor () {
		this.todos = [];
	}

	addTodo (description: string, done: boolean = false) {
		const todo = new Todo(description, done);
		this.todos.push(todo);
		return todo;
	}

	getTotal () {
		return this.todos.length;
	}

	getProgress () {
		const done = this.todos.filter((todo: any) => todo.done);
		if (done.length === 0) return 0;
		return Math.round(done.length/this.todos.length*100);
	}
}
