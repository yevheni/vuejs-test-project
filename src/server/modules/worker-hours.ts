import moment from "moment";
import {db} from "./database";

export module WorkerHours {
	interface IHoursExistsOptions {
		id?: string,
		worker: string,
		date: number,
		start: number,
		end: number,
	}
	export const hoursExists = async (options: IHoursExistsOptions) => {
		const day = moment(options.date).hour(0).minute(0).second(0).millisecond(0);
		const exists = await db.models.hours.countDocuments({
			...(options.id ? {
				_id: {
					$ne: options.id
				}
			} : {}),
			worker: options.worker,
			start: {
				$lt: options.end,
			},
			end: {
				$gt: options.start,
			},
			date: {
				$lte: moment(day).add(1, "day").subtract(1, "second").valueOf(),
				$gte: day.valueOf(),
			}
		});

		return !!exists;
	}
}
