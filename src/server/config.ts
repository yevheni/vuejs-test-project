export const ENV = process.env.NODE_ENV || "development";
export const DEV = ENV !== "production";
export const SERVER_PORT = 9090;

export const MONGODB = {
	url: `mongodb://db.bablo.red:27017/vuejs`,
	options: {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
		keepAlive: true,
		keepAliveInitialDelay: 60 * 1000,
		auth: {
			user: "vuejs",
			password: "OaaHp0WEzu"
		},
	}
};
