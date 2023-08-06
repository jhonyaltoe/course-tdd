/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/.+/index.ts',
    '<rootDir>/src/.+[.-]protocols.ts',
    '<rootDir>/src/main/.*'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  roots: [
    '<rootDir>/src'
  ],
  moduleNameMapper: {
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1'
  }
}

export default config
