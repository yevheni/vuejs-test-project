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

export {api};
