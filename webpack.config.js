const webpack = require('webpack');
const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new GasPlugin()
    ]
}