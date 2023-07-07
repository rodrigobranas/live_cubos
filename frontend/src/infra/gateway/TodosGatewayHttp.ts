import HttpClient from "../http/HttpClient";
import TodosGateway from "./TodosGateway";

export default class TodosGatewayHttp implements TodosGateway {
	
	constructor (readonly httpClient: HttpClient) {
	}

	async getTodos(): Promise<any> {
		const todosData = await this.httpClient.get("http://localhost:3000/todos");
		return todosData;
	}

}
