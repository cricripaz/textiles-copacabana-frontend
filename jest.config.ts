import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts", // Ajusta esto según la estructura de tu proyecto
    "!src/**/*.spec.ts", // Excluye archivos de prueba
    "!src/environments/**" // Excluye archivos de entorno
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover",
    "html"
  ],
  coverageProvider: "v8",
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  notify: true,
  verbose: true,
};

export default config;
