import express from 'express';
import {db} from "./database";

const api = express.Router();

api.post("/workers/create", (req, res, next) => {
	(async () => {
		/** Get worker name */
		const name = req.body.name;

		/** Check if "name" provided */
		if (!name) throw new Error(`Worker's name can't be empty`);

		/** Create worker */
		const workerDoc = await db.models.workers.create({
			name: name,
		});

		/** Send response */
		res.json({
			worker: workerDoc.toJSON(),
		});
	})().catch(next);
});

api.get("/workers", (req, res, next) => {
	(async () => {
		/** Get workers */
		const workers = await db.models.workers.aggregate([
			{
				$match: {}
			}
		]).allowDiskUse(true).exec();

		/** Send response */
		res.json({
			workers: workers,
		});
	})().catch(next);
});

api.post("/workers/delete", (req, res, next) => {
	(async () => {
		const id = req.body.id;

		/** Delete worker */
		await db.models.workers.deleteOne({
			_id: id
		});

		/** Send response */
		res.json({
			status: "success",
		});
	})().catch(next);
});

api.post("/workers/update", (req, res, next) => {
	(async () => {
		const id = req.body.id;

		/** Find worker */
		const workerDoc = await db.models.workers.findOne({
			_id: id
		});

		if (!workerDoc) throw new Error(`Worker not found`);

		/** Update worker */
		workerDoc.set("name", req.body.name);
		await workerDoc.save();

		/** Send response */
		res.json({
			worker: workerDoc.toJSON(),
		});
	})().catch(next);
});

api.post("/hours/create", (req, res, next) => {
	(async () => {
		/** Create hours */
		const hoursDoc = await db.models.hours.create({
			worker: req.body.worker,
			start: req.body.start,
			end: req.body.end,
			date: req.body.date,
		});

		/** Send response */
		res.json({
			hours: hoursDoc.toJSON(),
		});
	})().catch(next);
});

api.post("/hours/get", (req, res, next) => {
	(async () => {
		/** Get hours */
		const hours = await db.models.hours.aggregate([
			{
				$match: {
					date: {
						$gte: req.body.start,
						$lte: req.body.end,
					}
				}
			}
		]).allowDiskUse(true).exec();

		/** Send response */
		res.json({
			hours: hours
		});
	})().catch(next);
});

export {api};
