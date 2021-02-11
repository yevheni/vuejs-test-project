import template from "./workers.html";
import {Base} from "../../helpers/base";

export const Workers = Base.extend({
	template: template,

	data() {
		return {
			workers: this.$store.state.workers,
		}
	},
});
