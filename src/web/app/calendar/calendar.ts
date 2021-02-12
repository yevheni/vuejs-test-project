import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment, {unitOfTime} from "moment";

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
			showAddHours: false,
		}
	},

	methods: {
		updateDate(inc: number, unit: unitOfTime.Base) {
			this.weekStartDate.add(inc, unit);
			this.$forceUpdate();
		},

		addHours() {

		}
	},
});
