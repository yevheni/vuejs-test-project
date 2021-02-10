import template from "./add-worker.html";
import {Base} from "../../helpers/base";

export const AddWorker = Base.extend({
	template: template,

	data() {
		return {
			input: "",
		}
	},

	methods: {
		async onAdd(e: Event) {
			try {
				const name = this.input;

				console.log("name:", name);

				throw new Error(name);
			} catch (err) {
				this.errorHandle(err);
			}
		}
	}
});
