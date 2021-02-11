import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment from "moment";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			year: moment().year(),
		}
	},

	methods: {

	},
});
