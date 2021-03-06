import "./calendar.scss";
import template from "./calendar.html";
import {Base} from "../../helpers/base";
import moment, {unitOfTime} from "moment";
import {IHour} from "../../interfaces/hour";
import {AddEditWorkerHours} from "../add-edit-worker-hours/add-edit-worker-hours";
import {Picker} from "./picker/picker";
import {IWorker} from "../../interfaces/worker";
import {Modal} from "../modal/modal";

export const Calendar = Base.extend({
	template: template,

	data() {
		return {
			moment: moment,
			weekStartDate: moment().day(1).hour(0).minute(0).second(0).millisecond(0),
			get weekEndDate() {
				return moment(this.weekStartDate).day(7);
			},
			workers: this.$store.state.workers,
			hours: [] as IHour[],
			add: null,
			edit: null as {
				day: number,
				hour: IHour,
			},

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

			get weekdays () {
				return Array(7).fill(null).map((el, i) => {
					type Hour = IHour & { style: any };
					type WorkersObject = {
						[key: string]: IWorker & { style?: any }
					};

					const day = i + 1;
					const date = moment(this.weekStartDate).weekday(day);
					const hours: Hour[] = this.hours.filter((h: IHour) => moment(h.date).weekday() === day);
					const workers: WorkersObject = {};

					hours.forEach((h) => {
						workers[h.worker._id] = h.worker;
					});

					const workersArr = Object.values(workers).map((w, i) => {
						w.style = {
							gridRow: i + 2,
						};
						return w;
					});

					return {
						day: day,
						date: date,
						text: date.format("dddd, DD"),
						workers: workersArr,
						hours: hours.map((hour) => {
							const index = workersArr.findIndex(w => w._id === hour.worker._id);

							hour.style = {
								gridRow: index + 2,
								gridColumnStart: hour.start + 1,
								gridColumnEnd: hour.end + 1,
							};

							return hour;
						}),
						style: {
							gridTemplateRows: `minmax(2rem, auto) repeat(${workersArr.length}, auto)`
						}
					};
				})
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

		getFormattedHours(start: number, end: number) {
			return `(${start}:00-${end}:00)`;
		},

		setEdit(day: any, hour: IHour) {
			this.edit = {
				day: day,
				hour: hour,
			};
		},

		onAddHours() {
			this.add = false;
			this.init().catch(this.errorHandle);
		},

		onEditDeleteHours() {
			this.edit = null;
			this.init().catch(this.errorHandle);
		},
	},

	created() {
		this.init().catch(this.errorHandle);
	},

	components: {
		AddEditWorkerHours: AddEditWorkerHours,
		Picker: Picker,
		Modal: Modal,
	}
});
