import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment from "moment";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			moment: moment,
			weekStartDate: moment().day(1),
			get weekEndDate() {
				return moment(this.weekStartDate).day(7);
			},
			weekdays: Array(7).fill(null).map((el, i) => {
				return {
					text: moment().weekday(i + 1).format("dddd"),
				}
			}),
		}
	},

	methods: {
		updateMonth(inc: number) {
			this.weekStartDate.add(inc, "month");
			this.$forceUpdate();
		},

		updateWeek(inc: number) {
			this.weekStartDate.add(inc * 7, "days");
			this.$forceUpdate();
		},
	},
});
