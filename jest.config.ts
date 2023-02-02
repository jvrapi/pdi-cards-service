const swcConfig = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
      decorators: true
    },
    transform: {
      legacyDecorator: true,
      decoratorMetadata: true
    }
  }
};

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  testTimeout: 30000,
  moduleNameMapper: {
    '@application/(.*)$': '<rootDir>/src/application/$1',
    '@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '@infra/(.*)$': '<rootDir>/src/infra/$1',
    '@api/(.*)$': '<rootDir>/src/api/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@tests/(.*)$': '<rootDir>/src/tests/$1'
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig]
  }
};
