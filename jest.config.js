module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.protocol.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  // preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1', // captura tudo após @/; $1 é o resultado da captura da expressão regular
    '@tests(.*)': '<rootDir>/tests/$1', // captura tudo após @/; $1 é o resultado da captura da expressão regular
  },
};
