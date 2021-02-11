import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment from "moment";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			moment: moment,
			date: moment().day(1),
			get weekEndDate() {
				return moment(this.date).day(7);
			},
			weekdays: Array(7).fill(null).map((el, i) => {
				return {
					text: moment().weekday(i + 1).format("dd"),
				}
			}),
		}
	},

	methods: {
		updateMonth(inc: number) {
			this.date.add(inc, "month");
			this.$forceUpdate();
		},

		updateWeek(inc: number) {
			this.date.add(inc * 7, "days");
			this.$forceUpdate();
		},
	},
});
