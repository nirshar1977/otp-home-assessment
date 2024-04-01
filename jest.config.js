// jest.config.js
module.exports = {
    
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'], 
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
      },
    },
    testEnvironmentOptions: {
      PORT: 4000, // we specify a different port for Jest
    },
  };
  