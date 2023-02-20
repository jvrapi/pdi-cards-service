import { Config } from 'jest'

import jestConfig from './jest.config'

const config: Config = {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testRegex: '.integration.spec.ts$',
  coverageDirectory: './coverage/integration',
  setupFiles: ['./jest-setup.ts'],
}

export default config
