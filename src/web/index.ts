import "./index.scss";
import Vue from "vue";
import {App} from "./app/app";
import {store} from "./store";
import {router} from "./router";

const app = new Vue({
	el: '#root',
	store: store,
	router: router,
	components: {
		App: App,
	}
});
