import template from "./app.html";
import {AddWorker} from "./add-worker/add-worker";
import {Base} from "../helpers/base";
import {Workers} from "./workers/workers";
import {IWorker} from "../interfaces/worker";

export const App = Base.extend({
	template: template,

	data() {
		return {
			text: "App",
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
		AddWorker: AddWorker,
		Workers: Workers,
	}
});
