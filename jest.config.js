const jest = require("next/jest");
const nextEnv = require("@next/env");

nextEnv.loadEnvConfig(process.cwd());

const jestConfig = jest()({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 10000,
});

module.exports = jestConfig;
