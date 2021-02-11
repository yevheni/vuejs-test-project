import template from "./app.html";
import {Base} from "../helpers/base";
import {Workers} from "./workers/workers";
import {IWorker} from "../interfaces/worker";

export const App = Base.extend({
	template: template,

	data() {
		return {
			view: "workers", // workers, calendar
			nav_buttons: [
				{
					id: "calendar",
					text: "Calendar",
				},
				{
					id: "workers",
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

	components: {
		Workers: Workers,
	}
});
