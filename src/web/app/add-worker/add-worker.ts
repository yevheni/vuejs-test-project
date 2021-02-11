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
				/** Get worker name */
				const name = this.input;

				// console.log("name:", name);

				/** Create worker */
				const workerRes = await this.api.post("/workers/create", {
					name: name
				});
				const worker = workerRes.data.worker;

				// console.log("worker:", worker);

				/** Put worker to store */
				this.$store.commit("new_worker", worker);
			} catch (err) {
				this.errorHandle(err);
			}
		}
	}
});