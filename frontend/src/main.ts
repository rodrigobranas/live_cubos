import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import TodosGatewayHttp from "./infra/gateway/TodosGatewayHttp";
import AxiosAdapter from "./infra/http/AxiosAdapter";

const app = createApp(App);
const httpClient = new AxiosAdapter();
const todosGateway = new TodosGatewayHttp(httpClient);
app.provide("todosGateway", todosGateway);
app.mount("#app");
