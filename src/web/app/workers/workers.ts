import template from "./workers.html";
import {Base} from "../../helpers/base";
import {AddWorker} from "../add-worker/add-worker";
import {IWorker} from "../../interfaces/worker";

export const Workers = Base.extend({
	template: template,

	data() {
		return {
			workers: this.$store.state.workers,
			add: false,
			edit: false,
		}
	},

	methods: {
		onAdd(worker: IWorker) {
			this.add = false;
		},

		async deleteWorker(id: string) {
			try {
				/** Delete worker */
				const deleteRes = await this.api.post("/workers/delete", {
					id: id
				});

				/** Delete worker from store */
				this.$store.commit("delete_worker", id);
			} catch(err) {
				this.errorHandle(err);
			}
		},
	},

	components: {
		AddWorker: AddWorker
	}
});
