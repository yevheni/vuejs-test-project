import "./workers.scss";
import template from "./workers.html";
import {Base} from "../../helpers/base";
import {AddEditWorker} from "../add-edit-worker/add-edit-worker";
import {IWorker} from "../../interfaces/worker";

export const Workers = Base.extend({
	template: template,

	data() {
		return {
			workers: this.$store.state.workers,
			add: false,
			edit: null,
		}
	},

	methods: {
		onAdd(worker: IWorker) {
			this.add = false;
		},

		onEdit(worker: IWorker) {
			this.edit = null;
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
		AddEditWorker: AddEditWorker
	}
});
