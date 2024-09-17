/** @type {import('ts-jest').JestConfigWithTsJest} **/
// eslint-disable-next-line no-undef
module.exports = {
  // testEnvironment: 'node',
  testEnvironment: 'jest-environment-node',

  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
