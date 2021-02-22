import {IWorker} from "./worker";

export interface IHour {
	_id: string,
	worker: IWorker,
	start: number,
	end: number,
	date: number,
	created: number,
	updated: number,
}
