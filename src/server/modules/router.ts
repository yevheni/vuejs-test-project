import express from 'express';
import zlib from 'zlib';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(cookieParser());
router.use(compression({
	level: 9,
	strategy: zlib.Z_FILTERED
}));

const limit = "1mb";
router.use(bodyParser.json({limit: limit})); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true, limit: limit})); // for parsing application/x-www-form-urlencoded

/** Test */
router.post("/test", (req, res) => {
	res.send("OK");
});

/** Error handle */
router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err);

	res.status(500).json({
		message: err.message
	});
});

export {router};
