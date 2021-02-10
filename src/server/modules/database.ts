import {Mongo, MongoConfig} from "@yevheni/db";
import {logg} from "@yevheni/logg";
import {MONGODB} from "../config";

export class MongoConnector extends Mongo {
	models = {
		"workers": this.model("workers", {
			name: {
				type: String,
				// index: true,
			},
		}),
	};

	constructor(config: MongoConfig) {
		super(config);

		this.connection.on("connected", () => {
			logg.yellow(`Database connected`);
		});
	}
}

export const db = new MongoConnector(MONGODB);
