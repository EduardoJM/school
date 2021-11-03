const { name } = require('./package.json');

module.exports = {
    displayName: name,
    name,
    clearMocks: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
