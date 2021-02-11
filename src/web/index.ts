import "./index.scss";
import Vue from "vue";
import {App} from "./app/app";
import {store} from "./store";

const app = new Vue({
	el: '#root',
	store: store,
	components: {
		App: App,
	}
});
