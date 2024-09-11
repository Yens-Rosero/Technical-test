"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  preset: "@shelf/jest-dynamodb",
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest transformer for TypeScript files
  },
};
exports.default = config;
