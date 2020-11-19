const path = require( 'path' );
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './src/main-application.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    devServer: {
        contentBase: './',
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        open: true,
        hot: true,
        inline: true,
        disableHostCheck: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/canvaskit-wasm/bin/canvaskit.wasm' }
            ]
        })
    ],
    target: 'node'
};