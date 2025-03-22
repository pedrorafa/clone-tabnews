const jest = require("next/jest");
const nextEnv = require("@next/env");

nextEnv.loadEnvConfig(process.cwd());

const jestConfig = jest()({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
