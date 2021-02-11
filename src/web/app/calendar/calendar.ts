import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment from "moment";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			date: moment(),
			weekdays: Array(7).fill(null).map((el, i) => {
				return {
					text: moment().weekday(i + 1).format("dddd"),
				}
			}),
			// get months() {
			// 	return Array(12).fill(null).map((el, i) => {
			// 		const month = moment(this.year).month(i);
			//
			// 		return {
			// 			index: i,
			// 			name: month.format("MMMM"),
			// 			days: Array(month.daysInMonth()).fill(null).map((el, i) => {
			// 				const day = moment(month).date(i + 1);
			//
			// 				return {
			// 					text: day.format("DD"),
			// 					day_of_week: day.weekday(),
			// 					day: day,
			// 				}
			// 			}),
			// 			month: month,
			// 		};
			// 	})
			// },
		}
	},

	methods: {
		updateMonth(inc: number) {
			this.date.add(inc, "month");
			this.$forceUpdate();
		}
	},
});
