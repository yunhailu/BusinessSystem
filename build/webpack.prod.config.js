/**
 * Created by yunhailu on 16/7/19.
 */
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = merge(baseWebpackConfig,{
    devtool : '#source-map',
    output : {
        path : './dist',
        publicPath : '/',
        filename : 'static/[name].[chunkhash:7].js',
        chunkFilename : 'static/[id].[chunkhash:7].js'
    },
    plugins : [
        new cleanWebpackPlugin(['dist'],{ root: path.resolve(__dirname , '..'), verbose: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})

    ]
});