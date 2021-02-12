import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment, {unitOfTime} from "moment";
import {IHour} from "../../interfaces/hour";
import {IWorker} from "../../interfaces/worker";
import {AddEditWorkerHours} from "../add-edit-worker-hours/add-edit-worker-hours";

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
					add: false,
					edit: null as IHour,
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

		onAddHours(index: number, hours: any) {
			this.weekdays[index].add = false;
			this.init().catch(this.errorHandle);
		},

		onEditDeleteHours(index: number, hours?: any) {
			this.weekdays[index].edit = null;
			this.init().catch(this.errorHandle);
		},

		getDayHours(day: number, hour: number) {
			return this.hours.filter((h: IHour) => moment(h.date).day() === day && h.start <= hour && h.end >- hour);
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
	}
});
