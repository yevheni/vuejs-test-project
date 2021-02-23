import template from "./add-edit-worker-hours.html";
import {Base} from "../../helpers/base";
import moment from "moment";

export const AddEditWorkerHours = Base.extend({
	template: template,

	props: {
		date: {
			required: true,
			default: moment(),
		},
		id: {
			type: String,
			default: "",
		},
		worker: {
			type: String,
			default: "",
		},
		start: {
			default: "",
		},
		end: {
			default: "",
		},
	},

	data() {
		return {
			workers: this.$store.state.workers,
			form: {
				worker: this.$props.worker,
				start: this.$props.start,
				end: this.$props.end,
			}
		}
	},

	methods: {
		async onSubmit(e: Event) {
			try {
				if (!this.form.worker) throw new Error(`Worker not selected`);
				if (this.form.start === "") throw new Error(`Start hours not selected`);
				if (this.form.end === "") throw new Error(`End hours not selected`);
				if (this.form.start >= this.form.end) throw new Error(`Start hour can't be greater or equal than end hour`);
				if (this.form.end <= this.form.start) throw new Error(`End hour can't be lower or equal than start hour`);

				if (!!this.id) {
					/** Update */
					const hoursRes = await this.api.put("/hours", {
						id: this.id,
						start: this.form.start,
						end: this.form.end,
					});
					const updatedHours = hoursRes.data.hours;

					this.$emit("done", updatedHours);
				} else {
					/** Create */
					const hoursRes = await this.api.post("/hours", {
						...this.form,
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
				await this.api.delete("/hours", {
					params: {
						id: this.id,
					}
				});

				this.$emit("deleted");
			} catch(err) {
				this.errorHandle(err);
			}
		}
	},
});
