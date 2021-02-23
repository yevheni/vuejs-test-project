import template from "./app.html";
import {Base} from "../helpers/base";
import {Workers} from "./workers/workers";
import {IWorker} from "../interfaces/worker";
import {Calendar} from "./calendar/calendar";

export const App = Base.extend({
	template: template,

	data() {
		return {
			navButtons: [
				{
					path: "/",
					text: "Calendar",
				},
				{
					path: "/workers",
					text: "Workers",
				},
			]
		}
	},

	methods: {
		async init() {
			/** Get workers */
			const workersRes = await this.api.get("/workers");
			const workers: IWorker[] = workersRes.data.workers;

			// console.log("workers:", workers);

			/** Put to store */
			this.$store.commit("workers", workers);
		}
	},

	created() {
		this.init().catch(this.errorHandle);
	},
});
