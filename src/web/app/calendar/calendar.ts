import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment, {unitOfTime} from "moment";
import {IHour} from "../../interfaces/hour";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			moment: moment,
			weekStartDate: moment().day(1).hour(0).minute(0).second(0).millisecond(0),
			get weekEndDate() {
				return moment(this.weekStartDate).day(7);
			},
			weekdays: Array(7).fill(null).map((el, i) => {
				return {
					text: moment().weekday(i + 1).format("dddd"),
					show: false,
					worker: "",
					start: "",
					end: "",
				}
			}),
			workers: this.$store.state.workers,
			hours: [] as IHour[],
		}
	},

	methods: {
		async init() {
			/** Get hours */
			const hoursRes = await this.api.post("/hours/get", {
				start: this.weekStartDate.valueOf(),
				end: this.weekEndDate.valueOf(),
			});
			const hours = hoursRes.data.hours as IHour[];

			console.log("hours:", hours);

			this.hours = hours;
		},

		updateDate(inc: number, unit: unitOfTime.Base) {
			this.weekStartDate.add(inc, unit);
			this.$forceUpdate();
			this.init().catch(this.errorHandle);
		},

		async addHours(weekdayIndex: number) {
			try {
				/** Parse hours document */
				const weekday = this.weekdays[weekdayIndex];
				const date = moment(this.weekStartDate).day(weekdayIndex + 1);
				const hours = {
					worker: weekday.worker,
					start: weekday.start,
					end: weekday.end,
					date: date.valueOf(),
				};

				// console.log(hours);

				/** Create hours document */
				const hoursRes = await this.api.post("/hours/create", hours);
				const createdHours = hoursRes.data.hours;

				console.log(createdHours);

				/** Reset weekday */
				weekday.worker = "";
				weekday.start = "";
				weekday.end = "";
				weekday.show = false;
			} catch (err) {
				this.errorHandle(err);
			}
		},

		getDayHours(day: number, hour: number) {
			return this.hours.filter((h: IHour) => moment(h.date).day() === day && h.start <= hour && h.end >= hour);
		}
	},

	created() {
		this.init().catch(this.errorHandle);
	}
});
