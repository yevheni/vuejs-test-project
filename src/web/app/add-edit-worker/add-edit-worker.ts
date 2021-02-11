import template from "./add-edit-worker.html";
import {Base} from "../../helpers/base";

export const AddEditWorker = Base.extend({
	template: template,

	props: [
		"id",
		"name",
	],

	data() {
		return {
			input: this.name || "",
		}
	},

	methods: {
		async onSubmit(e: Event) {
			try {
				/** Get worker name */
				const name = this.input;

				// console.log("name:", name);

				if (this.id) {
					/** Update worker */
					const workerRes = await this.api.post("/workers/update", {
						id: this.id,
						name: name,
					});
					const worker = workerRes.data.worker;

					/** Update worker in store */
					this.$store.commit("update_worker", [this.id, worker]);

					/** Emit callback to external world */
					this.$emit("done", worker);
				} else {
					/** Create worker */
					const workerRes = await this.api.post("/workers/create", {
						name: name
					});
					const worker = workerRes.data.worker;

					// console.log("worker:", worker);

					/** Put worker to store */
					this.$store.commit("new_worker", worker);

					/** Emit callback to external world */
					this.$emit("done", worker);
				}
			} catch (err) {
				this.errorHandle(err);
			}
		}
	}
});
