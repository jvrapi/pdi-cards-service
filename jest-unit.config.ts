import { config as dotenvConfig } from 'dotenv'
import { Config } from 'jest'

import jestConfig from './jest.config'

dotenvConfig({ path: './.env.testing' })

const config: Config = {
  ...jestConfig,
  testRegex: '.unit.spec.ts$',
  coverageDirectory: './coverage/unit',
  setupFiles: ['./jest-setup.ts'],
}

export default config
