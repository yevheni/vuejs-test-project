import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment from "moment";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			year: moment().year(),
			get months() {
				return Array(12).fill(null).map((el, i) => {
					const month = moment(this.year).month(i);

					return {
						index: i,
						name: month.format("MMMM"),
						days: Array(month.daysInMonth()).fill(null).map((el, i) => {
							const day = moment(month).date(i + 1);

							return {
								text: day.format("DD"),
								day_of_week: day.weekday(),
								day: day,
							}
						}),
						month: month,
					};
				})
			},
		}
	},

	methods: {},

	created() {
		console.log("months:", this.months)
	}
});
