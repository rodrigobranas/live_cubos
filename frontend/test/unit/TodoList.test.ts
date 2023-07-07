import TodoList from "../../src/domain/TodoList";

test("Deve criar uma todolist vazia", function () {
	const todoList = new TodoList();
	expect(todoList.getTotal()).toBe(0);
	expect(todoList.getProgress()).toBe(0);
});

test("Deve criar uma todolist com 3 todos", function () {
	const todoList = new TodoList();
	const a = todoList.addTodo("A");
	todoList.addTodo("B");
	todoList.addTodo("C");
	a.toggleDone();
	expect(todoList.getTotal()).toBe(3);
	expect(todoList.getProgress()).toBe(33);
});
