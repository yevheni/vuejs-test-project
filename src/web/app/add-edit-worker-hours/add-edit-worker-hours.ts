import template from "./add-edit-worker-hours.html";
import {Base} from "../../helpers/base";
import {IWorker} from "../../interfaces/worker";

export const AddEditWorkerHours = Base.extend({
	template: template,

	props: {
		dates: {
			type: Array,
			required: true,
			default: [],
		}
	},

	data() {
		return {
			// date: moment(),
			workers: this.$store.state.workers,
			// workerId: this.hours?.worker || "",
			// start: this.hours?.start || "",
			// end: this.hours?.end || ""
			form: {
				worker: "",
				date: "",
				start: "",
				end: "",
			}
		}
	},

	methods: {
		// getWorker(id: string) {
		// 	return this.workers.find((w: IWorker) => w._id === id);
		// },

		async onSubmit(e: Event) {
			try {
				if (!this.form.worker) throw new Error(`Worker not selected`);
				if (!this.form.date) throw new Error(`Day not selected`);
				if (this.form.start === "") throw new Error(`Start hours not selected`);
				if (this.form.end === "") throw new Error(`End hours not selected`);
				if (this.form.start >= this.form.end) throw new Error(`Start hour can't be greater or equal than end hour`);
				if (this.form.end <= this.form.start) throw new Error(`End hour can't be lower or equal than start hour`);

				// if (this.hours) {
				// 	/** Update */
				// 	const hoursRes = await this.api.put("/hours", {
				// 		id: this.hours._id,
				// 		start: this.start,
				// 		end: this.end,
				// 		date: this.date.valueOf(),
				// 	});
				// 	const updatedHours = hoursRes.data.hours;
				//
				// 	this.$emit("done", updatedHours);
				// } else {
					/** Create */
					const hoursRes = await this.api.post("/hours", this.form);
					const createdHours = hoursRes.data.hours;

					this.$emit("done", createdHours);
				// }
			} catch (err) {
				this.errorHandle(err);
			}
		},

		// async deleteHours() {
		// 	try {
		// 		await this.api.delete("/hours", {
		// 			params: {
		// 				id: this.hours._id,
		// 			}
		// 		});
		//
		// 		this.$emit("deleted");
		// 	} catch(err) {
		// 		this.errorHandle(err);
		// 	}
		// }
	},


});
