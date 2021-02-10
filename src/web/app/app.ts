import Vue from "vue";
import template from "./app.html";
import {AddWorker} from "./add-worker/add-worker";

export const App = Vue.extend({
	template,

	data() {
		return {
			text: "App",
		}
	},

	components: {
		AddWorker,
	}
});
