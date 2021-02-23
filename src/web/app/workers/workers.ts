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
			deleteWorkerId: "",
		}
	},

	methods: {
		onAdd(worker: IWorker) {
			this.add = false;
		},

		onEdit(worker: IWorker) {
			this.edit = null;
		},

		async deleteWorker() {
			try {
				this.edit = null;

				const id = this.deleteWorkerId;

				/** Delete worker */
				const deleteRes = await this.api.delete("/workers", {
					params: {
						id: id
					}
				});

				/** Delete worker from store */
				this.$store.commit("delete_worker", id);

				this.deleteWorkerId = "";
			} catch(err) {
				this.errorHandle(err);
			}
		},
	},

	components: {
		AddEditWorker: AddEditWorker
	}
});
