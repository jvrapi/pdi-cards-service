import { Config } from 'jest'
const swcConfig = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
      decorators: true,
    },
    transform: {
      legacyDecorator: true,
      decoratorMetadata: true,
    },
  },
}

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov'],
  testTimeout: 30000,
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig],
  },
}

export default config
