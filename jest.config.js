// jest.config.js

module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'], 
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
      }
    },
    detectOpenHandles: true,
    globalSetup: './globalTestSetup.js'
  };
  