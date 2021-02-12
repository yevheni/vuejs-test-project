import template from "./add-edit-worker-hours.html";
import {Base} from "../../helpers/base";
import {IWorker} from "../../interfaces/worker";

export const AddEditWorkerHours = Base.extend({
	template: template,

	props: [
		"date",
		"hours",
	],

	data() {
		return {
			workers: this.$store.state.workers,
		}
	},

	computed: {
		workerId: function() {
			return this.hours?.worker || ""
		},
		start: function() {
			return this.hours?.start || ""
		},
		end: function() {
			return this.hours?.end || ""
		},
	},

	methods: {
		getWorker(id: string) {
			return this.workers.find((w: IWorker) => w._id === id);
		},

		async onSubmit(e: Event) {
			try {
				if (!this.workerId) throw new Error(`Worker not selected`);
				if (this.start === "") throw new Error(`Start hours not selected`);
				if (this.end === "") throw new Error(`End hours not selected`);
				if (this.start >= this.end) throw new Error(`Start hour can't be greater than end hour`);
				if (this.end <= this.start) throw new Error(`End hour can't be lower than start hour`);

				if (this.hours) {
					/** Update */
					const hoursRes = await this.api.post("/hours/update", {
						id: this.hours._id,
						start: this.start,
						end: this.end,
						date: this.date.valueOf(),
					});
					const updatedHours = hoursRes.data.hours;

					this.$emit("done", updatedHours);
				} else {
					/** Create */
					const hoursRes = await this.api.post("/hours/create", {
						worker: this.workerId,
						start: this.start,
						end: this.end,
						date: this.date.valueOf(),
					});
					const createdHours = hoursRes.data.hours;

					this.$emit("done", createdHours);
				}
			} catch (err) {
				this.errorHandle(err);
			}
		},

		async deleteHours() {
			try {
				await this.api.post("/hours/delete", {
					id: this.hours._id,
				});

				this.$emit("deleted");
			} catch(err) {
				this.errorHandle(err);
			}
		}
	},


});
