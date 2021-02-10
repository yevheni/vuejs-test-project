import template from "./app.html";
import {AddWorker} from "./add-worker/add-worker";
import {Base} from "../helpers/base";

export const App = Base.extend({
	template: template,

	data() {
		return {
			text: "App",
		}
	},

	components: {
		AddWorker: AddWorker,
	}
});
