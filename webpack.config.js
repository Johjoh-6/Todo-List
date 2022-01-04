// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development", // production || development
    devtool: 'inline-source-map',
    entry: {
        index: './src/asset/js/index.js'
    },
    output: {
        filename: 'asset/js/[name]-[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'asset/css/style-[chunkhash].bundle.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/asset/img", to: "asset/img" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', "sass-loader","postcss-loader"
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        compress: true,
        hot: true,
        port: 4000,
        devMiddleware: {
            index: true,
            mimeTypes: { 'text/html': ['phtml'] },
            publicPath: '/publicPathForDevServe',
            serverSideRender: true,
            writeToDisk: true,
        },
    },
};