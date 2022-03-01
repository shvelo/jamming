/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/__fixtures__/', '/__utils__/', './src/__tests__/setup.ts'],
  setupFiles: ['./src/__tests__/setup.ts'],
};
