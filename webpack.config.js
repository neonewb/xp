import path from 'path'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

export default {
	entry: {
		app: path.resolve('./src/app/index.ts')
	},
	output: {
		path: path.resolve('./dist'),
		filename: '[name].bundle.js',
		clean: true
	},
	target: 'web',
	devServer: {
		port: 3000,
		open: true,
		hot: true
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new HtmlPlugin({
			template: './src/index.html',
			scriptLoading: 'defer'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './src/assets',
					to: 'assets'
				},
				{
					from: './src/styles',
					to: 'styles'
				}
			]
		})
	]
}
