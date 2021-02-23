import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment, {unitOfTime} from "moment";
import {IHour} from "../../interfaces/hour";
import {IWorker} from "../../interfaces/worker";
import {AddEditWorkerHours} from "../add-edit-worker-hours/add-edit-worker-hours";
import {Picker} from "./picker/picker";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			moment: moment,
			weekStartDate: moment().day(1).hour(0).minute(0).second(0).millisecond(0),
			get weekEndDate() {
				return moment(this.weekStartDate).day(7);
			},
			get weekdays() {
				return Array(7).fill(null).map((el, i) => {
					const day = i + 1;
					const date = moment(this.weekStartDate).weekday(day);

					return {
						day: day,
						date: date,
						text: date.format("dddd, DD"),
					};
				})
			},
			workers: this.$store.state.workers,
			hours: [] as IHour[],
			add: -1,
			edit: null as any,

			get year() {
				const startYear = this.weekStartDate.format("YYYY");
				const endYear = this.weekEndDate.format("YYYY");

				return `${startYear}${startYear !== endYear ? ` / ${endYear}` : ""}`;
			},
			get month() {
				const startMonth = this.weekStartDate.format("MMMM");
				const endMonth = this.weekEndDate.format("MMMM");

				return `${startMonth}${startMonth !== endMonth ? ` / ${endMonth}` : ""}`;
			},
			get week() {
				const startWeek = this.weekStartDate.format("DD");
				const endWeek = this.weekEndDate.format("DD");

				return `${startWeek} - ${endWeek}`;
			},
		}
	},

	methods: {
		async init() {
			/** Get hours */
			const hoursRes = await this.api.get("/hours", {
				params: {
					start: this.weekStartDate.valueOf(),
					end: this.weekEndDate.valueOf(),
				},
			});
			const hours = hoursRes.data.hours as IHour[];

			console.log("hours:", hours);

			this.hours = hours;

			/** Test hours */
			// const testHours = [
			// 	{
			// 		_id: "0",
			// 		worker: "First",
			// 		start: 0,
			// 		end: 3,
			// 		date: Date.now(),
			// 		created: Date.now(),
			// 		updated: Date.now(),
			// 	},
			// 	{
			// 		_id: "1",
			// 		worker: "Second",
			// 		start: 2,
			// 		end: 6,
			// 		date: Date.now(),
			// 		created: Date.now(),
			// 		updated: Date.now(),
			// 	},
			// 	{
			// 		_id: "2",
			// 		worker: "Veeeeeeeeery long worker name",
			// 		start: 0,
			// 		end: 1,
			// 		date: Date.now(),
			// 		created: Date.now(),
			// 		updated: Date.now(),
			// 	},
			// ];

			// this.hours = this.weekdays.map((day: any) => {
			// 	const dayHours = hours.filter(hour => moment(hour.date).weekday() === day.day);
			//
			// 	return {
			// 		hours: dayHours,
			// 		start: hours.map((el: any) => el.start).sort()[0] || 0,
			// 		end: hours.map((el: any) => el.end).sort().reverse()[0] || 0,
			// 	}
			// });
		},

		updateDate(inc: number, unit: unitOfTime.Base) {
			this.weekStartDate.add(inc, unit);

			if (unit === "month" || unit === "year") {
				this.weekStartDate.day(1);
			}

			this.$forceUpdate();
			this.init().catch(this.errorHandle);
		},

		getFormattedHours(start: number, end: number) {
			return `(${start}:00-${end}:00)`;
		},

		onAddHours(hours: any) {
			this.add = false;
			this.init().catch(this.errorHandle);
		},

		onEditDeleteHours(hours?: any) {
			this.edit = null;
			this.init().catch(this.errorHandle);
		},

		// getDayHours(day: number, hour: number) {
		getDayHours(day: number) {
			// return this.hours.filter((h: IHour) => moment(h.date).day() === day && h.start <= hour && h.end >= hour);
			return this.hours.filter((h: IHour) => {
				return moment(h.date).weekday() === day;
			}).map((hour: IHour & { style: any }, i: number) => {
				hour.style = {
					gridRow: i + 2,
					// gridRowStart: i + 2,
					// gridRowEnd: i + 3,
					gridColumnStart: hour.start + 1,
					gridColumnEnd: hour.end + 1,
				};

				return hour;
			});
		},

		// getDayWorkers(day: number) {
		// 	return this.workers.map((worker: IWorker & { hours: IHour[] }) => {
		// 		worker.hours = this.hours.filter((h: IHour) => h.worker === worker._id && moment(h.date).day() === day);
		//
		// 		return worker;
		// 	}).filter((worker: IWorker & { hours: IHour[] }) => worker.hours.length);
		// }
	},

	created() {
		this.init().catch(this.errorHandle);
	},

	components: {
		AddEditWorkerHours: AddEditWorkerHours,
		Picker: Picker,
	}
});
