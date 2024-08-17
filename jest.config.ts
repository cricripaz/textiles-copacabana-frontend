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
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/app/guards auth.guard.ts",
    "/app/guards role.guard.ts",
    "/app/pages/main main.module.ts",
    "/app/app-routing.module.ts",
    "/app/app.module.ts",
    "src/app/pages/main/dashboard-ia/dashboard-ia.component.ts"// Agrega cualquier otra ruta que desees ignorar
  ]
};

export default config;
