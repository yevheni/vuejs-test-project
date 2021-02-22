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
			weekdays: Array(7).fill(null).map((el, i) => {
				return {
					text: moment().weekday(i + 1).format("dddd"),
				}
			}),
			workers: this.$store.state.workers,
			hours: [] as IHour[],
			add: null,
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
			const hours = hoursRes.data.hours;

			// console.log("hours:", hours);

			this.hours = hours;
		},

		updateDate(inc: number, unit: unitOfTime.Base) {
			this.weekStartDate.add(inc, unit);

			if (unit === "month" || unit === "year") {
				this.weekStartDate.day(1);
			}

			this.$forceUpdate();
			this.init().catch(this.errorHandle);
		},

		onAddHours(hours: any) {
			this.add = null;
			this.init().catch(this.errorHandle);
		},

		onEditDeleteHours(hours?: any) {
			this.edit = null;
			this.init().catch(this.errorHandle);
		},

		getDayHours(day: number, hour: number) {
			return this.hours.filter((h: IHour) => moment(h.date).day() === day && h.start <= hour && h.end >= hour);
		},

		getDayWorkers(day: number) {
			return this.workers.map((worker: IWorker & { hours: IHour[] }) => {
				worker.hours = this.hours.filter((h: IHour) => h.worker === worker._id && moment(h.date).day() === day);

				return worker;
			}).filter((worker: IWorker & { hours: IHour[] }) => worker.hours.length);
		}
	},

	created() {
		this.init().catch(this.errorHandle);
	},

	components: {
		AddEditWorkerHours: AddEditWorkerHours,
		Picker: Picker,
	}
});
