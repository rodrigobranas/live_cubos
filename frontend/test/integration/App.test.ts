import { mount } from "@vue/test-utils";
import AppVue from "../../src/App.vue";
import TodosGateway from "../../src/infra/gateway/TodosGateway";
import Todo from "../../src/domain/Todo";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}

test("Deve testar a todolist vazia", function () {
	const wrapper = mount(AppVue, {});
	expect(wrapper.get(".total").text()).toBe("0");
	expect(wrapper.get(".progress").text()).toBe("0%");
});

test("Deve testar a todolist adicionando 3 todos", async function () {
	const wrapper = mount(AppVue, {});
	await wrapper.get(".input-todo-description").setValue("A");
	await wrapper.get(".button-add-todo").trigger("click");
	expect(wrapper.findAll(".todo-description").at(0)?.text()).toBe("A");
	await wrapper.get(".input-todo-description").setValue("B");
	await wrapper.get(".button-add-todo").trigger("click");
	expect(wrapper.findAll(".todo-description").at(1)?.text()).toBe("B");
	await wrapper.get(".input-todo-description").setValue("C");
	await wrapper.get(".button-add-todo").trigger("click");
	expect(wrapper.findAll(".todo-description").at(2)?.text()).toBe("C");
	expect(wrapper.get(".total").text()).toBe("3");
	expect(wrapper.get(".progress").text()).toBe("0%");
});

test("Deve testar a todolist adicionando 3 todos e mudar um deles para done", async function () {
	const wrapper = mount(AppVue, {});
	await wrapper.get(".input-todo-description").setValue("A");
	await wrapper.get(".button-add-todo").trigger("click");
	await wrapper.get(".input-todo-description").setValue("B");
	await wrapper.get(".button-add-todo").trigger("click");
	await wrapper.get(".input-todo-description").setValue("C");
	await wrapper.get(".button-add-todo").trigger("click");
	await wrapper.findAll(".button-toggle-done").at(0)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("33%");
	await wrapper.findAll(".button-toggle-done").at(1)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("67%");
	await wrapper.findAll(".button-toggle-done").at(2)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("100%");
	await wrapper.findAll(".button-toggle-done").at(0)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("67%");
});

test("Deve testar a todolist carregando os todos da api", async function () {
	const todosGateway: TodosGateway = {
		async getTodos(): Promise<Todo[]> {
			return [
				new Todo("A", true),
				new Todo("B", false),
				new Todo("C", false)
			]
		}
	}
	const wrapper = mount(AppVue, {
		global: {
			provide: {
				todosGateway
			}
		}
	});
	await wrapper.get(".load-todos").trigger("click");
	await sleep(200);
	expect(wrapper.get(".total").text()).toBe("3");
	expect(wrapper.get(".progress").text()).toBe("33%");
});
