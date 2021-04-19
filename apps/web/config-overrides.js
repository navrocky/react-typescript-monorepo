/* eslint-disable import/no-extraneous-dependencies */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (config) => {
  // Remove the ModuleScopePlugin which throws when we try to import something
  // outside of src/.
  config.resolve.plugins.pop();

  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  // Let Babel compile outside of src/.
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
  const tsRule = oneOfRule.oneOf.find((rule) =>
    rule.test.toString().includes("ts|tsx")
  );
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  // Change source root for ESLintPlugin
  const esLintPlugin = config.plugins.find(
    (p) => p.key === "ESLintWebpackPlugin"
  );
  if (esLintPlugin) {
    esLintPlugin.options.context = path.resolve("../../packages/base/src");
    // esLintPlugin.options.cwd = path.resolve("../../");
    // esLintPlugin.options.exclude = /node_modules/;
  }
  // console.warn(`================   `, esLintPlugin)

  const tsCheckerPlugin = config.plugins.find(
    (p) => (p.options || {}).typescript
  );
  console.warn(
    `================  TsCheckerPlugin: `,
    tsCheckerPlugin.options
  );

  if (tsCheckerPlugin) {

    // tsCheckerPlugin.options.
  }

  return config;
};
