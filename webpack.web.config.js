const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const minimist = require("minimist");

const argv = minimist(process.argv);

const mode = argv.mode || "development";
const port = argv.port || 9191;

const sourceDir = path.join(__dirname, `src/web`);
const distDir = path.join(__dirname, `dist/web`);

/** Web Config */
module.exports = {
	mode: mode,
	target: "web",
	devtool: mode === "development" ? "eval-source-map" : "source-map",
	entry: {
		"index": path.join(sourceDir, `index.ts`),
	},
	output: {
		path: distDir,
		filename: `js/[name].js`,
		chunkFilename: `js/[name].js`,
		publicPath: `/assets/`
	},
	devServer: {
		contentBase: sourceDir,
		compress: true,
		port: port,
		historyApiFallback: {
			rewrites: [
				{
					from: /^.*$/,
					to: () => {
						return "index.html";
					}
				}
			]
		},
		stats: {
			preset: "errors-warnings",
			colors: true,
			timings: true,
		}
	},
	stats: {
		preset: "errors-warnings",
		colors: true,
	},
	performance: {
		maxEntrypointSize: 1024000,
		maxAssetSize: 512000
	},
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
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				exclude: /node_modules/,
				use: {
					loader: "file-loader",
					options: {
						name: "img/[name].[ext]?h=[contenthash]",
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					mode === "development" ? {
						loader: 'style-loader',
						options: {}
					} : {
						loader: MiniCssExtractPlugin.loader,
						options: {}
					},
					{
						loader: 'css-loader',
						options: {}
					},
					{
						loader: 'resolve-url-loader',
						options: {}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.join(sourceDir, `partials.scss`),
							]
						},
					},
				],
			},
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				// 	NODE_ENV: JSON.stringify(ENV),
				// 	// MODE: JSON.stringify(MODE),
				mode: JSON.stringify(mode),
			}
		}),
		new MiniCssExtractPlugin({
			filename: "css/index.css",
		}),
		// new OptimizeCssAssetsPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.join(sourceDir, `index.html`),
					to: path.join(distDir, `index.html`)
				},
			]
		}),
	],
};
