const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        mainFields: ['main', 'module', 'browser'],
    },
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, '..', 'components', 'RichTextEditor', 'browser.tsx'),
    ],
    output: {
        path: path.resolve(__dirname, '..', '..', 'core', 'static', 'modules', 'rich-text-editor'),
        filename: 'rte.min.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'django.jQuery'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'rte.min.css',
        }),
    ],
};
