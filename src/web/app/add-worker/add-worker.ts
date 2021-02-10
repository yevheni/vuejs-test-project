import Vue from "vue";
import template from "./add-worker.html";

export const AddWorker = Vue.extend({
	template,

	data() {
		return {
			input: "",
		}
	},

	methods: {
		async onAdd(e: Event) {
			const name = this.$data.input;

			console.log("name:", name);
		}
	}
});
