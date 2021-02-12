const path = require('path');
const minimist = require("minimist");
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const argv = minimist(process.argv);

const mode = argv.mode || "development";

/** Server Config */
module.exports = {
	mode: mode,
	target: "node",
	devtool: "source-map",
	entry: {
		"server": path.join(__dirname, `src/server/server.ts`),
	},
	output: {
		path: path.join(__dirname, `dist/server`),
		filename: `[name].js`,
		chunkFilename: `[name].js`,
	},
	stats: {
		preset: "errors-warnings",
		colors: true,
	},
	performance: {
		maxEntrypointSize: 10240000,
		maxAssetSize: 5120000
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						configFile: path.join(__dirname, `tsconfig.json`),
					}
				}
			},
		]
	},
	plugins: [
		//
	],
};
