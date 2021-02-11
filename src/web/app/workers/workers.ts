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
		}
	},

	components: {
		AddWorker: AddWorker
	}
});
