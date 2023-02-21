import { Config } from 'jest'

import jestConfig from './jest.config'

const config: Config = {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testRegex: '.e2e.spec.ts$',
  coverageDirectory: './coverage/e2e',
  setupFiles: ['./jest-integration.setup.ts'],
}

export default config
