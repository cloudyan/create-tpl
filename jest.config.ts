// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['**/*.spec.[jt]s?(x)'],
  testTimeout: 10000,
  // globalSetup: './scripts/jestGlobalSetup.cjs',
  // globalTeardown: './scripts/jestGlobalTeardown.cjs',
  // testEnvironment: './scripts/jestEnv.cjs',
  // setupFilesAfterEnv: ['./scripts/jestPerTestSetup.ts'],
  // watchPathIgnorePatterns: ['<rootDir>/packages/temp'],
  // modulePathIgnorePatterns: ['<rootDir>/packages/temp'],
  // moduleNameMapper: {
  //   testUtils: '<rootDir>/packages/playground/testUtils.ts'
  // },
  globals: {
    'ts-jest': {
      tsconfig: './__tests__/tsconfig.json'
    }
  }
}

export default config
