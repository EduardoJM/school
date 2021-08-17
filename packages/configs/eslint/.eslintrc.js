/* eslint-disable quote-props */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'next/core-web-vitals',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        // typescript
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 4],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        // react
        'react/prop-types': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        // import
        'import/extensions': [
            'error',
            'never',
            {
                ignorePackages: false,
                pattern: {
                    '.tsx': 'never',
                    '.ts': 'never',
                },
            },
        ],
    },
};
