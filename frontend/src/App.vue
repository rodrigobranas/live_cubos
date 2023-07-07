<script setup lang="ts">
	import { inject, ref } from 'vue';
	import TodosGateway from './infra/gateway/TodosGateway';
	import TodoList from './domain/TodoList';

	const todoList: any = ref(new TodoList());
	const description = ref("");

	const todosGateway = inject("todosGateway") as TodosGateway;

	async function loadTodos () {
		const todosData = await todosGateway.getTodos();
		for (const todoData of todosData) {
			todoList.value.addTodo(todoData.description, todoData.done);
		}
	}
</script>
<template>
	<div class="total">{{ todoList.getTotal() }}</div>
	<div class="progress">{{ todoList.getProgress() }}%</div>
	<button class="load-todos" @click="loadTodos()">load</button>
	<div v-for="todo in todoList.todos">
		<div class="todo-description">{{ todo.description }}</div>
		<button class="button-toggle-done" @click="todo.toggleDone()">done/undone</button>
	</div>
	<input class="input-todo-description" v-model="description"/>
	<button class="button-add-todo" @click="todoList.addTodo(description)">add</button>
</template>
<style>
</style>
