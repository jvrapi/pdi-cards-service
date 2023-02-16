import jestConfig from './jest.config'

export default {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testRegex: '.integration.spec.ts$',
  coverageDirectory: './coverage/integration',
}
