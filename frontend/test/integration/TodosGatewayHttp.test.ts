import TodosGatewayHttp from "../../src/infra/gateway/TodosGatewayHttp";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}

test("Deve testar o TodosGatewayHttp", async function () {
	const httpClient = new AxiosAdapter();
	const todosGateway = new TodosGatewayHttp(httpClient);
	const todosData = await todosGateway.getTodos();
	await sleep(200);
	expect(todosData).toHaveLength(3);
});
