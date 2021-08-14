const path = require('path');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        mainFields: ['main', 'module', 'browser'],
    },
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '..', '..', 'admin', 'core', 'static', 'admin', 'js'),
        filename: 'rich-text-editor.min.js',
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
