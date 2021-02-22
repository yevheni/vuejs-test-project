import express from 'express';
import {db} from "./database";
import {logg} from "@yevheni/logg";

const api = express.Router();

api.post("/workers", (req, res, next) => {
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
			},
			{
				$sort: {
					name: 1
				}
			}
		]).allowDiskUse(true).exec();

		/** Send response */
		res.json({
			workers: workers,
		});
	})().catch(next);
});

api.delete("/workers", (req, res, next) => {
	(async () => {
		const id = req.query.id;

		/** Delete worker */
		await db.models.workers.deleteOne({
			_id: id
		});

		/** Delete hours */
		await db.models.hours.deleteMany({
			worker: id
		});

		/** Send response */
		res.json({
			status: "success",
		});
	})().catch(next);
});

api.put("/workers", (req, res, next) => {
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

/** Hours */
api.post("/hours", (req, res, next) => {
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

api.get("/hours", (req, res, next) => {
	(async () => {
		/** Get hours */
		const hours = await db.models.hours.aggregate([
			{
				$match: {
					date: {
						$gte: parseInt(req.query.start as string),
						$lte: parseInt(req.query.end as string),
					}
				}
			},
			{
				$lookup: {
					from: "workers",
					let: {
						worker: "$worker"
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ["$_id", "$$worker"]
								}
							}
						}
					],
					as: "worker"
				}
			},
			{
				$addFields: {
					worker: {
						$arrayElemAt: ["$worker", 0]
					}
				}
			},
			{
				$match: {
					$expr: {
						$ifNull: ["$worker", false]
					}
				}
			},
			{
				$sort: {
					start: 1,
					created: 1,
				}
			}
		]).allowDiskUse(true).exec();

		/** Send response */
		res.json({
			hours: hours
		});
	})().catch(next);
});

api.put("/hours", (req, res, next) => {
	(async () => {
		/** Get hours document */
		const hoursDoc = await db.models.hours.findOne({
			_id: req.body.id,
		});

		if (!hoursDoc) throw new Error(`Hours document not found`);

		/** Update */
		hoursDoc.set("start", req.body.start);
		hoursDoc.set("end", req.body.end);
		await hoursDoc.save();

		/** Send response */
		res.json({
			hours: hoursDoc.toJSON()
		});
	})().catch(next);
});

api.delete("/hours", (req, res, next) => {
	(async () => {
		/** Delete hours document */
		await db.models.hours.deleteOne({
			_id: req.query.id,
		});

		/** Send response */
		res.json({
			status: "success"
		});
	})().catch(next);
});

export {api};
