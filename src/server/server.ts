import process from "process";
import {createServer} from "http";
import express from "express";
import cors from "cors";
import {DEV, ENV, SERVER_PORT} from "./config";
import {logg} from "@yevheni/logg";
import {router} from "./modules/router";
import {db} from "./modules/database";

/** Handle uncaught exceptions */
process.on('unhandledRejection', (reason, p) => {
	logg.red("!!!!! Unhandled Rejection !!!!!");
	// console.error(reason, 'Unhandled Rejection at Promise', p);
	console.error(reason);
});
process.on('uncaughtException', (err) => {
	// console.error(err, 'Uncaught Exception thrown');
	logg.red("!!!!! Uncaught Exception !!!!!");
	console.error(err);
	process.exit(1);
});

const initServer = async () => {
	const app = express();
	const server = createServer(app);

	if (DEV) {
		app.use(cors());
	}

	app.use('/', router);

	app.set('trust proxy', "127.0.0.1");

	/** Start server */
	const listenServer = () => {
		return new Promise<void>((resolve, reject) => {
			server.listen(SERVER_PORT, (err?: any) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};

	await listenServer();

	logg.blue(`Server running \nPORT: ${SERVER_PORT} \nENV: ${ENV}`);
};

initServer().then(() => {
	//
}).catch(err => console.error(err));
