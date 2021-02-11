import template from "./add-worker.html";
import {Base} from "../../helpers/base";

export const AddWorker = Base.extend({
	template: template,

	props: [
		"name",
	],

	data() {
		return {
			input: this.name || "",
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

				/** Emit callback to external world */
				this.$emit("add", worker);
			} catch (err) {
				this.errorHandle(err);
			}
		}
	}
});
