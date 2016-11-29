/**
 * Created by yunhailu on 16/07/17
 *
 */

var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: ['./src/main.js'],
		vendor: ['vue','vue-router','vue-resource','vuex']
	},
	devtool: '#source-map',
	output: {
		path: './dist',
		publicPath: '',
		filename: 'static/[name].build.js',
		chunkFilename: 'static/[id].[name].build.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/
			},
			{
				test : /\.vue$/,
				loader : 'vue'
			},
			{
				test : /\.css$/,
				loader : 'style-loader!css-loader'
			},
			{
				test : /\.json$/,
				loader : 'json-loader'
			},
			{
				test : /\.(png|jpg|gif|ttf|otf|eot|woff|svg|swf)/,
				loader : 'url-loader',
				query : {
					limit : 10000,
					name : 'static/[name].[hash:7].[ext]'
				}
			}
		]
	},
	vue : {
		loaders : {
			js : 'babel',
			css : 'less'
		}
	}
}

