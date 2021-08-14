const path = require('path');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        mainFields: ['main', 'module', 'browser'],
    },
    entry: './src/RichTextEditor/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: '@inventare/rich-text-editor',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
};
