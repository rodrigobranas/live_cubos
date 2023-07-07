import Todo from "../../domain/Todo";

export default interface TodosGateway {
	getTodos (): Promise<Todo[]>;
}
