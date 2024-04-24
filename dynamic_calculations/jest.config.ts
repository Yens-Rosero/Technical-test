const dynaLite = require("jest-dynalite/jest-preset");
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  ...dynaLite,
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
};
export default config;
